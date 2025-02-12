import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenDto } from 'src/dtos/token.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    public create(@Body() tokenDto: TokenDto, @Req() req: any) {
        return this.tokenService.createToken(tokenDto, req.user.id);
    }

    @Get('per-org/:orgId')
    @UseGuards(JwtAuthGuard)
    public findTokensPerOrgId(@Param('orgId') orgId: string) {
        return this.tokenService.findTokensByOrgId(orgId);
    }
}
