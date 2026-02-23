import { IsArray, IsEnum, IsInt, IsNotEmpty, Min, ArrayMinSize, IsString } from 'class-validator';

export enum ServicePackage {
    X3 = 'x3',
    X5 = 'x5',
}

export class CreateOrderDto {
    @IsArray({ message: 'Barcodes phải là mảng' })
    @ArrayMinSize(1, { message: 'Đơn hàng phải có ít nhất 1 mã vạch (barcode)' })
    @IsString({ each: true })
    barcodes: string[];

    @IsEnum(ServicePackage, { message: 'servicePackage phải là "x3" hoặc "x5"' })
    @IsNotEmpty()
    servicePackage: ServicePackage;

    @IsInt({ message: 'totalBags phải là số nguyên' })
    @Min(1, { message: 'totalBags phải ít nhất là 1' })
    totalBags: number;
}
