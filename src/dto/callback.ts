import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class MetaDataCallback {
  @IsOptional()
  @IsString()
  qr_string: string;
  
  @IsOptional()
  @IsNumber()
  amount_to_display: number;
  
  @IsOptional()
  @IsString()
  transaction_fee_policy: string;
}

export class IncomingCreditCallback {
  @IsOptional()
  @IsString()
  version: string;
  
  @IsOptional()
  @IsString()
  created_at: string;
  
  @IsOptional()
  @IsString()
  id: string;
  
  @IsOptional()
  @IsString()
  type: string;
  
  @IsOptional()
  @IsNumber()
  amount_raw: number;
  
  @IsOptional()
  @IsNumber()
  cut: number;
  
  @IsOptional()
  @IsString()
  donator_name: string;
  
  @IsOptional()
  @IsString()
  donator_email: string;
  
  @IsOptional()
  @IsBoolean()
  donator_is_user: boolean;
  
  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsDefined()
  @IsObject()
  @Type(() => MetaDataCallback)
  etc: MetaDataCallback;
}