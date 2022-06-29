import { prisma } from '~/db.server'

import type { Piece } from '@prisma/client'

export async function getPieces(){
    return prisma.piece.findMany() 
}