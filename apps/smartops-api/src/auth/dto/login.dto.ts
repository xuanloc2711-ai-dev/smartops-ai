import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email không hợp lệ' })
    @IsNotEmpty({ message: 'Email là bắt buộc' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password là bắt buộc' })
    @MinLength(6, { message: 'Password phải có ít nhất 6 ký tự' })
    password: string;
}
