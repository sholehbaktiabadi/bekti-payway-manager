import { RedisClientType } from 'redis';
import { infoLog } from '../../helper/logger';

type Serializable = string | number | boolean | object | null;

export class CacheService {
    private client: RedisClientType;

    constructor(client: RedisClientType) {
        this.client = client;
        this.client.on('error', (err: Error) => {
            console.error('Redis Client Error', err);
        });
    }

    async set<T extends Serializable>(key: string, value: T, ttl?: number): Promise<boolean> {
        try {
            const stringValue = JSON.stringify(value);
            if (ttl) {
                await this.client.set(key, stringValue, { EX: ttl });
            } else {
                await this.client.set(key, stringValue);
            }
            return true;
        } catch (error) {
            console.error(`Error setting key ${key} in Redis`, error);
            return false;
        }
    }

    async get<T extends Serializable>(key: string): Promise<T | null> {
        try {
            const value = await this.client.get(key);
            if (value === null) {
                return null;
            }
            if (typeof value !== 'string') {
                return value as unknown as T;
            }
            try {
                return JSON.parse(value) as T;
            } catch {
                return value as unknown as T;
            }
        } catch (error) {
            console.error(`Error getting key ${key} from Redis`, error);
            return null;
        }
    }

    async del(key: string): Promise<boolean> {
        try {
            const result = await this.client.del(key);
            return result > 0;
        } catch (error) {
            console.error(`Error deleting key ${key} from Redis`, error);
            return false;
        }
    }

    async exists(key: string): Promise<boolean> {
        try {
            const result = await this.client.exists(key);
            return result === 1;
        } catch (error) {
            console.error(`Error checking existence of key ${key} in Redis`, error);
            return false;
        }
    }

    async countKeysByPattern(pattern: string): Promise<number> {
        try {
            const keys = await this.client.keys(pattern);
            return keys.length;
        } catch (error) {
            console.error(`Error counting keys with pattern ${pattern} in Redis`, error);
            return 0;
        }
    }

    async delByPattern(pattern: string): Promise<number> {
        try {
            const keys = await this.client.keys(pattern);
            if (keys.length > 0) {
                const result = await this.client.del(keys);
                infoLog(`success deleted keys: ${result}`)
                return result;
            }
            return 0;
        } catch (error) {
            console.error(`Error deleting keys with pattern ${pattern} from Redis`, error);
            return 0;
        }
    }
}