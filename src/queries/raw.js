import { Prisma } from "@prisma/client";

export function getMatchPoints() {
    return Prisma.Match
}