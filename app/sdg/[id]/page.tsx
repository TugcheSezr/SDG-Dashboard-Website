
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSDGById } from '@/lib/data'
import { prisma } from '@/lib/prisma'
import { SDGDetailClient } from './SDGDetailClient'


export async function generateStaticParams() {
// Onze sdgs
  return [{ id: '3' }, { id: '4' }, { id: '7' }, { id: '11' }]
}

type PageProps = { params: { id: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = Number(params.id)
  const sdg = Number.isFinite(id) ? getSDGById(id) : undefined

  if (!sdg) {
    return { title: 'SDG Niet Gevonden' }
  }

  return {
    title: `SDG ${sdg.number}: ${sdg.title} | SDG Dashboard`,
    description: sdg.description,
  }
}

async function getSDGData(sdgNumber: number) {
  try {
    const metrics = await prisma.sdgMetric.findMany({
      where: { sdgNumber },
      orderBy: [{ year: 'asc' }, { country: 'asc' }],
    })
    return metrics
  } catch (err) {
    console.error('[getSDGData] Prisma query failed', err)
    return []
  }
}

export default async function SDGDetailPage({ params }: PageProps) {
 
  const sdgNumber = Number(params.id)
  if (!Number.isFinite(sdgNumber)) {
    notFound()
  }
  const sdg = getSDGById(sdgNumber)
  if (!sdg || !sdg.implemented) {
    notFound()
  }
  const metrics = await getSDGData(sdgNumber)
  return (
    <SDGDetailClient
      sdg={sdg}
      metrics={metrics}
      isAuthenticated={false} // als auth heeft toegevoegd, maak het update.
      isFavorite={false}      // als auth heeft toegevoegd, maak het update.
    />
  )
}
