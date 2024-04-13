import { IntercepModal } from '@/app/_shared/components/modal/intercep-modal'
import { getPublicWhiteboard } from '@/app/_whiteboards/actions/public-whiteboard'
import { WhiterboardFromCompressed } from '@/app/_whiteboards/components/whiteboard'

export default async function Page({ params }: {params: {id: string}}) {
  const whiteboardId = Number(params.id)
 
  const whiteboard = await getPublicWhiteboard(whiteboardId)
  
  return (
    <IntercepModal title={whiteboard.name}>
      <section className="h-[calc(100dvh-300px)] w-full">
        <WhiterboardFromCompressed
          viewModeEnabled
          id={whiteboard?.id} 
          initialRawCompressed={whiteboard.compressedRawContent} 
        />
      </section>
    </IntercepModal>
  )
}
