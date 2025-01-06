'use server'

import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_COOKIE } from '@/constants';

export type Session = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
};

const sessionSecretKey = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(sessionSecretKey)

export async function createSession(playload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await new SignJWT(playload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  (await cookies()).set(AUTH_COOKIE, session, {
    httpOnly: true, // 防止客户端脚本访问
    secure: true, // 只通过 HTTPS 传输
    expires: expiredAt,
    sameSite: 'lax', // 防止跨站请求伪造
    path: '/', // 设置为根路径, '/' 表示整个网站
  })
}

export async function getSession() {
  const cookie = (await cookies()).get(AUTH_COOKIE)?.value
  if (!cookie) return null

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload as Session
  } catch (error) {
    console.error('session verify error', error)
    redirect('/auth/sign-in')
  }
}

export async function deleteSession() {
  (await cookies()).delete(AUTH_COOKIE)
}

export async function updateSession({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get(AUTH_COOKIE)?.value
  if (!cookie) return null

  const { payload } = await jwtVerify<Session>(cookie, encodedKey)
  if (!payload) throw new Error('session verify error')

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  }

  await createSession(newPayload)
}
