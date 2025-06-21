"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              About CoinScope
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              CoinScope is the next-generation cryptocurrency analytics platform designed for traders, investors, and
              enthusiasts who demand the most comprehensive and real-time market data available.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our cutting-edge technology aggregates data from hundreds of exchanges worldwide, providing you with
              unparalleled insights into the crypto market. Whether you're a seasoned trader or just starting your
              crypto journey, CoinScope has the tools you need to make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="cyber-glow">
                <Link href="/markets">
                  Start Exploring <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" >
                <Link href="/compare">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass-morphism cyber-border rounded-2xl p-8">
              <Image
                src="/1.jpg"

                alt="CoinScope Dashboard"
                width={500}
                height={400}
                className="rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
