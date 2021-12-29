import { NextRequest, NextResponse } from 'next/server';

// 全局中间件
export function middleware(req: NextRequest, res: NextResponse) {
  console.log(req);
}
