import Image from 'next/image'
import Logo from '../../public/clipboard.webp'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='bg-[#233381] min-h-screen w-full py-5'>
      <div className="gap-2 relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
        <div className="w-full h-64 lg:w-1/2 lg:h-auto">
          <Image 
            src={Logo}
            alt="Imagem da Logo"
            width={600}
            className='h-full w-full object-cover'
          />
        </div>

        <div className="rounded-4xl max-w-lg bg-white/20 bg-clip-padding backdrop-filter backdrop-blur-md border border-gray-100 md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
          <div className="flex flex-col p-12 md:px-16">
            <div className='flex flex-row gap-2 items-end'>
              <h2 className="text-2xl font-medium text-white lg:text-4xl">Escutam</h2>
              <span className='text-5xl font-extrabold text-white'>AQUI</span>
            </div>
            <p className="mt-4 text-white w-9/12">
              Com apenas um registro rápido, você pode solicitar demanda para governos e acompanhar as atualizações de suas demanda.
            </p>
            <div className="mt-8">
              <div className="space-x-4 space-y-4 text-center">
                <Link
                href="/login"
                className="w-52 h-20 px-5 py-2.0 rounded-2xl cursor-pointer text-white text-lg items-center tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700 flex justify-center"
                >Clique Aqui
                </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}