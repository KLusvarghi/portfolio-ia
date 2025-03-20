import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

@Injectable()
// dentro da classe, podemos exterder para a classe "PrismaClient" que utilizaremos para acessar nosso Prisma
export class PrismaProvider extends PrismaClient {}
