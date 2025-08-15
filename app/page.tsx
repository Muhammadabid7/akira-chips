"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { ShoppingCart, Plus, Minus, MapPin, Phone, Users, Star, Award, Truck } from "lucide-react"

const LazyImage = ({
  src,
  alt,
  className,
  ...props
}: { src: string; alt: string; className?: string; [key: string]: any }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imgRef, setImgRef] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!imgRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(imgRef)
    return () => observer.disconnect()
  }, [imgRef])

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      <img
        ref={setImgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={`transition-all duration-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"} ${className}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
      />
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
      )}
    </div>
  )
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderForm {
  name: string
  address: string
  addressDetail: string
}

const flavors = [
  {
    id: "cokelat",
    name: "Cokelat",
    description: "Rasa cokelat premium yang memanjakan lidah",
    color: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20",
    hoverColor: "hover:shadow-[0_0_30px_rgba(109,76,65,0.4)]",
    buttonColor: "bg-[#6D4C41] hover:bg-[#5D4037] text-white",
    image: "/cokelat-1.png",
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Kelembutan tiramisu dalam setiap gigitan",
    color: "bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
    hoverColor: "hover:shadow-[0_0_30px_rgba(215,204,200,0.4)]",
    buttonColor: "bg-[#D7CCC8] hover:bg-[#BCAAA4] text-gray-800",
    image: "/tiramisu-1.png",
  },
  {
    id: "matcha",
    name: "Matcha",
    description: "Kesegaran matcha yang menenangkan",
    color: "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20",
    hoverColor: "hover:shadow-[0_0_30px_rgba(129,199,132,0.4)]",
    buttonColor: "bg-[#81C784] hover:bg-[#66BB6A] text-white",
    image: "/matcha-1.png",
  },
  {
    id: "stroberi",
    name: "Stroberi",
    description: "Manis-asam stroberi yang menyegarkan",
    color: "bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20",
    hoverColor: "hover:shadow-[0_0_30px_rgba(240,98,146,0.4)]",
    buttonColor: "bg-[#F06292] hover:bg-[#EC407A] text-white",
    image: "/stroberi-1.png",
  },
  {
    id: "taro",
    name: "Taro",
    description: "Gurih-manis taro yang unik",
    color: "bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
    hoverColor: "hover:shadow-[0_0_30px_rgba(206,147,216,0.4)]",
    buttonColor: "bg-[#CE93D8] hover:bg-[#BA68C8] text-white",
    image: "/taro-1.png",
  },
]

const teamMembers = [
  { name: "Alghi", position: "CEO", image: "/alghi.png" },
  { name: "Fikri", position: "Manajer Operasional", image: "/fikri.png" },
  { name: "Abid", position: "Manajer IT", image: "/abid.png" },
  { name: "Rio", position: "Manajer Keuangan", image: "/rio.png" },
  { name: "Asraf", position: "Tim Produksi", image: "/asraf.png" },
  { name: "Soza", position: "Tim Produksi", image: "/soza.png" },
]

const blogPosts = [
  {
    id: 1,
    title: "5 Manfaat Pisang untuk Kesehatan Tubuh",
    excerpt: "Pisang bukan hanya lezat, tapi juga kaya akan nutrisi penting untuk tubuh. Yuk, kenali manfaatnya!",
    content:
      "Pisang mengandung potasium yang baik untuk jantung, vitamin B6 untuk metabolisme, dan serat untuk pencernaan. Keripik pisang AKIRA CHIPS mempertahankan sebagian besar nutrisi ini melalui proses pengolahan yang tepat.",
    image: "/pisang-segar-sehat.png",
    date: "15 Agustus 2025",
    category: "Kesehatan",
  },
  {
    id: 2,
    title: "Resep Smoothie Bowl dengan Keripik Pisang",
    excerpt: "Kreasikan keripik pisang AKIRA CHIPS menjadi topping smoothie bowl yang sehat dan lezat!",
    content:
      "Campurkan pisang beku, yogurt, dan madu. Tambahkan keripik pisang AKIRA CHIPS sebagai topping untuk tekstur renyah yang unik. Sempurna untuk sarapan sehat!",
    image: "/smoothie-bowl-banana-chips.png",
    date: "12 Agustus 2025",
    category: "Resep",
  },
  {
    id: 3,
    title: "Camilan Sehat untuk Aktivitas Harian",
    excerpt: "Pilih camilan yang tepat untuk mendukung energi dan produktivitas sepanjang hari.",
    content:
      "Keripik pisang adalah pilihan camilan sehat karena mengandung karbohidrat kompleks dan potasium. Varian rasa AKIRA CHIPS memberikan variasi tanpa mengurangi nilai gizi.",
    image: "/healthy-banana-chips.png",
    date: "10 Agustus 2025",
    category: "Tips Sehat",
  },
]

export default function HomePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const [showShippingInfo, setShowShippingInfo] = useState(false)
  const [selectedBlogPost, setSelectedBlogPost] = useState<(typeof blogPosts)[0] | null>(null)
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false)
  const [quickOrderFlavor, setQuickOrderFlavor] = useState<string>("")
  const [quickOrderQuantity, setQuickOrderQuantity] = useState(1)
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    address: "",
    addressDetail: "",
  })
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const addToCart = (flavor: (typeof flavors)[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === flavor.id)
      if (existing) {
        return prev.map((item) => (item.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [
        ...prev,
        {
          id: flavor.id,
          name: flavor.name,
          price: 10000,
          quantity: 1,
          image: flavor.image,
        },
      ]
    })
  }

  const handleQuickOrder = (flavorId: string) => {
    setQuickOrderFlavor(flavorId)
    setQuickOrderQuantity(1)
    setIsQuickOrderOpen(true)
  }

  const submitQuickOrder = () => {
    const selectedFlavor = flavors.find((f) => f.id === quickOrderFlavor)
    if (!selectedFlavor || !orderForm.name || !orderForm.address) return

    const total = selectedFlavor ? 10000 * quickOrderQuantity : 0
    const message = `*PESANAN CEPAT AKIRA CHIPS*\n\nNama: ${orderForm.name}\nAlamat: ${orderForm.address}\n${orderForm.addressDetail ? `Detail: ${orderForm.addressDetail}\n` : ""}\n*Pesanan:*\n${selectedFlavor?.name} x${quickOrderQuantity} = Rp ${total.toLocaleString("id-ID")}\n\n*Total: Rp ${total.toLocaleString("id-ID")}*\n\nTerima kasih!`

    const whatsappUrl = `https://wa.me/62895636303934?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset quick order form
    setQuickOrderFlavor("")
    setQuickOrderQuantity(1)
    setIsQuickOrderOpen(false)
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      (prev) =>
        prev
          .map((item) => {
            if (item.id === id) {
              const newQuantity = Math.max(0, item.quantity + change)
              return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
            }
            return item
          })
          .filter(Boolean) as CartItem[],
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleOrder = () => {
    setShowShippingInfo(true)
  }

  const submitOrder = () => {
    const orderDetails = cart
      .map((item) => `${item.name} x${item.quantity} = Rp ${(item.price * item.quantity).toLocaleString("id-ID")}`)
      .join("\n")

    const total = getTotalPrice()
    const message = `*PESANAN AKIRA CHIPS*\n\nNama: ${orderForm.name}\nAlamat: ${orderForm.address}\n${orderForm.addressDetail ? `Detail: ${orderForm.addressDetail}\n` : ""}\n*Pesanan:*\n${orderDetails}\n\n*Total: Rp ${total.toLocaleString("id-ID")}*\n\nTerima kasih!`

    const whatsappUrl = `https://wa.me/62895636303934?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset form and cart
    setCart([])
    setOrderForm({ name: "", address: "", addressDetail: "" })
    setIsOrderFormOpen(false)
    setShowShippingInfo(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 border-b border-yellow-200/30 dark:border-yellow-400/20 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <LazyImage
              src="/logo.png"
              alt="AKIRA CHIPS Logo"
              className="w-12 h-12 rounded-full object-cover neomorphic transition-all duration-300 hover:scale-110 hover:rotate-6"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent font-sans transition-all duration-300 hover:scale-105">
              AKIRA CHIPS
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="relative neomorphic neomorphic-hover bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-800 border-0 transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4 mr-2 transition-transform duration-300" />
                  Keranjang
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-pulse-soft border-0">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="neomorphic animate-fade-in-up">
                <DialogHeader>
                  <DialogTitle className="font-space-grotesk">Keranjang Belanja</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Keranjang masih kosong</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-card rounded-lg neomorphic-inset transition-all duration-300 hover:scale-[1.02]"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center space-x-3">
                            <LazyImage
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover transition-transform duration-300 hover:scale-110"
                            />
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 p-0 neomorphic transition-all duration-200 hover:scale-110 active:scale-95"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 p-0 neomorphic transition-all duration-200 hover:scale-110 active:scale-95"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold">Total:</span>
                          <span className="font-bold text-lg text-primary">
                            Rp {getTotalPrice().toLocaleString("id-ID")}
                          </span>
                        </div>
                        <Button
                          onClick={handleOrder}
                          className="w-full neomorphic neomorphic-hover font-space-grotesk transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          size="lg"
                        >
                          Pesan Sekarang
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 transition-transform duration-1000 ease-out"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="w-full h-full bg-gradient-to-br from-yellow-300/40 via-amber-300/40 to-orange-400/40 dark:from-yellow-600/20 dark:via-amber-600/20 dark:to-orange-600/20"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent mb-6 font-sans transition-all duration-500 hover:scale-105 drop-shadow-lg">
              AKIRA CHIPS
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto font-serif leading-relaxed">
              Keripik pisang istimewa dengan sentuhan rasa yang belum pernah Anda bayangkan. Dari manisnya cokelat,
              lembutnya tiramisu, segarnya matcha, manis-asam stroberi, hingga gurih-manis taro, setiap gigitan
              menghadirkan kejutan rasa yang memanjakan lidah.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                {
                  icon: Star,
                  text: "Premium Quality",
                  color:
                    "bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 text-yellow-700 dark:text-yellow-300",
                },
                {
                  icon: Award,
                  text: "5 Rasa Unik",
                  color:
                    "bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 text-amber-700 dark:text-amber-300",
                },
                {
                  icon: Truck,
                  text: "Free Ongkir 5KM",
                  color:
                    "bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/40 dark:to-orange-800/40 text-orange-700 dark:text-orange-300",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 ${item.color} px-6 py-3 rounded-full neomorphic transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <item.icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                  <span className="font-medium font-sans">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-lg font-semibold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent mb-8 font-sans animate-pulse-soft">
              Bukan sekadar camilan — ini adalah pengalaman rasa.
            </p>
            <Button
              size="lg"
              className="neomorphic neomorphic-hover bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 hover:from-yellow-500 hover:via-amber-500 hover:to-orange-500 text-gray-800 font-sans text-lg px-8 py-4 border-0 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            >
              Jelajahi Rasa
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-20 px-4 bg-gradient-to-br from-yellow-50/70 via-amber-50/70 to-orange-50/70 dark:from-gray-800/70 dark:via-gray-700/70 dark:to-gray-600/70 transition-colors duration-300"
      >
        <div className="container mx-auto">
          <h3 className="text-5xl font-bold text-center mb-4 font-sans bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent transition-all duration-500 hover:scale-105 drop-shadow-sm">
            Varian Rasa
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg font-serif">
            Pilih rasa favorit Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flavors.map((flavor, index) => (
              <Card
                key={flavor.id}
                className={`neomorphic neomorphic-hover ${flavor.color} ${flavor.hoverColor} border-0 overflow-hidden transition-all duration-500 hover:scale-105 group`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6">
                  <div className="mb-6 flex justify-center">
                    <LazyImage
                      src={flavor.image || "/placeholder.svg"}
                      alt={flavor.name}
                      className="w-48 h-48 object-cover rounded-xl neomorphic-inset transition-all duration-300 hover:scale-110 group-hover:shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-2 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
                      {flavor.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-serif">{flavor.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent font-sans drop-shadow-sm">
                        Rp 10.000
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">/pcs</span>
                    </div>
                    <Button
                      onClick={() => addToCart(flavor)}
                      className={`w-full ${flavor.buttonColor} neomorphic neomorphic-hover font-sans border-0 transition-all duration-300 hover:scale-105 active:scale-95 mb-2`}
                    >
                      <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                      Tambah ke Keranjang
                    </Button>
                    <Button
                      onClick={() => handleQuickOrder(flavor.id)}
                      variant="outline"
                      className="w-full neomorphic neomorphic-hover font-sans border-yellow-300 dark:border-yellow-600 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Pesan Cepat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-yellow-50/30 to-amber-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/50 transition-colors duration-300">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 font-sans bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent transition-all duration-500 hover:scale-105 drop-shadow-sm">
            Tim Kami
          </h3>
          <p className="text-center text-muted-foreground mb-12 text-lg">Orang-orang hebat di balik AKIRA CHIPS</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="neomorphic neomorphic-hover bg-card border-0 text-center transition-all duration-500 hover:scale-105 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto mb-4 neomorphic rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110">
                    <LazyImage
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = "none"
                        const fallback = target.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = "flex"
                      }}
                    />
                    <div
                      className="w-full h-full bg-primary rounded-full flex items-center justify-center"
                      style={{ display: "none" }}
                    >
                      <Users className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h4 className="font-bold mb-1 font-space-grotesk transition-colors duration-300">{member.name}</h4>
                  <p className="text-sm text-muted-foreground font-dm-sans">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section with Health Tips and Recipes */}
      <section className="py-20 px-4 bg-gradient-to-br from-yellow-50/70 via-amber-50/70 to-orange-50/70 dark:from-gray-800/70 dark:via-gray-700/70 dark:to-gray-600/70 transition-colors duration-300">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 font-sans bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent transition-all duration-500 hover:scale-105 drop-shadow-sm">
            Tips Kesehatan & Resep
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 text-lg font-serif">
            Inspirasi hidup sehat dengan keripik pisang AKIRA CHIPS
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="neomorphic neomorphic-hover bg-gradient-to-br from-white to-yellow-50/50 dark:from-gray-800 dark:to-gray-700/50 border-0 overflow-hidden transition-all duration-500 hover:scale-105 group cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedBlogPost(post)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 border-0 neomorphic">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-serif">{post.date}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-3 font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 font-serif leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center text-yellow-600 dark:text-yellow-400 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      <span>Baca Selengkapnya</span>
                      <svg
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-yellow-50/50 via-amber-50/50 to-orange-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-600/50 transition-colors duration-300">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-4 font-sans bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent transition-all duration-500 hover:scale-105 drop-shadow-sm">
            Hubungi Kami
          </h3>
          <p className="text-muted-foreground mb-8 text-lg">Siap melayani pesanan Anda</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="neomorphic bg-card border-0 transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <h4 className="font-bold mb-2 font-space-grotesk">WhatsApp</h4>
                <p className="text-muted-foreground mb-4">Pesan langsung via WhatsApp</p>
                <Button
                  onClick={() => window.open("https://wa.me/62895636303934", "_blank")}
                  className="neomorphic neomorphic-hover font-sans bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white border-0 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  +62895-6363-03934
                </Button>
              </CardContent>
            </Card>

            <Card className="neomorphic bg-card border-0 transition-all duration-500 hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bounce" />
                <h4 className="font-bold mb-2 font-space-grotesk">Lokasi</h4>
                <p className="text-muted-foreground mb-4">JL.Santai RT.01 NO.151</p>
                <Button
                  onClick={() => window.open("https://maps.app.goo.gl/XfTdYb4VyGK1sCj19", "_blank")}
                  variant="outline"
                  className="neomorphic neomorphic-hover font-space-grotesk transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Lihat di Maps
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white transition-colors duration-300">
        <div className="container mx-auto text-center">
          <h4 className="text-2xl font-bold mb-4 font-sans transition-all duration-300 hover:scale-105 drop-shadow-lg">
            AKIRA CHIPS
          </h4>
          <p className="mb-4 font-serif drop-shadow-sm">Pengalaman rasa yang tak terlupakan</p>
          <p className="text-sm opacity-80">© 2025 AKIRA CHIPS. All rights reserved.</p>
        </div>
      </footer>

      {/* Shipping Info Dialog */}
      <Dialog open={showShippingInfo} onOpenChange={setShowShippingInfo}>
        <DialogContent className="neomorphic animate-fade-in-up">
          <DialogHeader>
            <DialogTitle className="font-space-grotesk text-primary">Informasi Pengiriman</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-accent transition-transform duration-300 hover:scale-110" />
                <span className="font-semibold text-accent">Free Ongkir!</span>
              </div>
              <p className="text-sm">
                Gratis ongkos kirim untuk pemesanan dalam radius 5 KM dari pusat AKIRA CHIPS (JL.Santai RT.01 NO.151)
              </p>
            </div>
            <Button
              onClick={() => {
                setShowShippingInfo(false)
                setIsOrderFormOpen(true)
              }}
              className="w-full neomorphic neomorphic-hover font-space-grotesk transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Lanjutkan Pemesanan
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Post Detail Dialog */}
      <Dialog open={!!selectedBlogPost} onOpenChange={() => setSelectedBlogPost(null)}>
        <DialogContent className="neomorphic animate-fade-in-up max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedBlogPost && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <LazyImage
                    src={selectedBlogPost.image}
                    alt={selectedBlogPost.title}
                    className="w-full h-64 object-cover rounded-lg neomorphic-inset"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-800 border-0 neomorphic">
                    {selectedBlogPost.category}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-serif">{selectedBlogPost.date}</span>
                </div>
                <DialogTitle className="font-sans text-2xl bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {selectedBlogPost.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 font-serif text-lg leading-relaxed">
                  {selectedBlogPost.content}
                </p>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg neomorphic-inset">
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-serif">
                    <strong>Tips AKIRA CHIPS:</strong> Nikmati keripik pisang kami sebagai bagian dari gaya hidup sehat
                    Anda. Kombinasikan dengan buah segar atau yogurt untuk camilan yang lebih bergizi!
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Order Form Dialog */}
      <Dialog open={isOrderFormOpen} onOpenChange={setIsOrderFormOpen}>
        <DialogContent className="neomorphic animate-fade-in-up">
          <DialogHeader>
            <DialogTitle className="font-space-grotesk text-primary">Form Pemesanan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-dm-sans">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                value={orderForm.name}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, name: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            <div>
              <Label htmlFor="address" className="font-dm-sans">
                Alamat
              </Label>
              <Textarea
                id="address"
                value={orderForm.address}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, address: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
            <div>
              <Label htmlFor="addressDetail" className="font-dm-sans">
                Detail Alamat (Opsional)
              </Label>
              <Input
                id="addressDetail"
                value={orderForm.addressDetail}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, addressDetail: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Contoh: dekat toko ABC, warna rumah hijau"
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2 font-space-grotesk">Ringkasan Pesanan:</h4>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-1">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>Total:</span>
                <span className="text-primary">Rp {getTotalPrice().toLocaleString("id-ID")}</span>
              </div>
            </div>
            <Button
              onClick={submitOrder}
              disabled={!orderForm.name || !orderForm.address}
              className="w-full neomorphic neomorphic-hover font-space-grotesk transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kirim Pesanan via WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Order Dialog */}
      <Dialog open={isQuickOrderOpen} onOpenChange={setIsQuickOrderOpen}>
        <DialogContent className="neomorphic animate-fade-in-up">
          <DialogHeader>
            <DialogTitle className="font-space-grotesk text-primary">Pesan Cepat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {quickOrderFlavor && (
              <div className="p-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-800/60 dark:to-amber-800/60 rounded-lg neomorphic-inset border border-yellow-200 dark:border-yellow-600/30">
                <div className="flex items-center space-x-3">
                  <LazyImage
                    src={flavors.find((f) => f.id === quickOrderFlavor)?.image || "/placeholder.svg"}
                    alt={flavors.find((f) => f.id === quickOrderFlavor)?.name || ""}
                    className="w-16 h-16 rounded-lg object-cover neomorphic"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                      {flavors.find((f) => f.id === quickOrderFlavor)?.name}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">Rp 10.000 per pcs</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="quickQuantity" className="font-dm-sans">
                Jumlah
              </Label>
              <div className="flex items-center space-x-3 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickOrderQuantity(Math.max(1, quickOrderQuantity - 1))}
                  className="w-10 h-10 p-0 neomorphic transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-16 text-center font-bold text-lg bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  {quickOrderQuantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuickOrderQuantity(quickOrderQuantity + 1)}
                  className="w-10 h-10 p-0 neomorphic transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="quickName" className="font-dm-sans">
                Nama Lengkap
              </Label>
              <Input
                id="quickName"
                value={orderForm.name}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, name: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <Label htmlFor="quickAddress" className="font-dm-sans">
                Alamat
              </Label>
              <Textarea
                id="quickAddress"
                value={orderForm.address}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, address: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Masukkan alamat lengkap"
              />
            </div>

            <div>
              <Label htmlFor="quickAddressDetail" className="font-dm-sans">
                Detail Alamat (Opsional)
              </Label>
              <Input
                id="quickAddressDetail"
                value={orderForm.addressDetail}
                onChange={(e) => setOrderForm((prev) => ({ ...prev, addressDetail: e.target.value }))}
                className="neomorphic-inset transition-all duration-300 focus:scale-[1.02]"
                placeholder="Contoh: dekat toko ABC, warna rumah hijau"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Rp {(10000 * quickOrderQuantity).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            <Button
              onClick={submitQuickOrder}
              disabled={!orderForm.name || !orderForm.address || !quickOrderFlavor}
              className="w-full neomorphic neomorphic-hover font-space-grotesk bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-gray-800 border-0 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Pesan Sekarang via WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
