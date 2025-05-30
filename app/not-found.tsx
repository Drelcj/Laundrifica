import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
        <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 opacity-20">
        <Image src="/images/404/detergent.png" alt="Detergent" width={80} height={80} className="animate-bounce" />
      </div>

      <div className="absolute bottom-20 left-20 opacity-20">
        <Image
          src="/images/404/washing-machine.png"
          alt="Washing machine"
          width={120}
          height={120}
          className="animate-bounce"
        />
      </div>

      <div className="absolute top-20 right-10 opacity-20">
        <Image
          src="https://res.cloudinary.com/dt3czltxx/image/upload/v1748611377/laundrifica_images/404/laundry-basket_a8tna3.jpg"
          alt="Laundry basket"
          width={100}
          height={100}
          className="animate-bounce"
        />
      </div>

      <div className="absolute bottom-10 right-10 opacity-20">
        <Image src="/images/404/clothes.png" alt="Clothes" width={60} height={60} className="animate-bounce" />
      </div>
    </div>
  )
}
