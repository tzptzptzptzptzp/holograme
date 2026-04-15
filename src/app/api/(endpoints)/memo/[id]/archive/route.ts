import { NextResponse } from "next/server";
import { prisma } from "../../../../../../libs/Prisma.lib";
import { withAuth } from "../../../../helpers/auth.helper";

export const PUT = withAuth(
  async (
    req: Request,
    userId: string,
    context: { params: Promise<{ id: string }> }
  ) => {
    const { id: idParam } = await context.params;
    const id = parseInt(idParam, 10);

    const item = await prisma.memo.findUnique({
      where: { id: id },
    });

    if (!item || item.userId !== userId) {
      return NextResponse.json(
        { error: "Item not found or unauthorized" },
        { status: 404 }
      );
    }

    const { archive } = await req.json();

    const data = await prisma.memo.update({
      where: { id: id },
      data: {
        archived: archive,
      },
    });

    return NextResponse.json(data);
  }
);
