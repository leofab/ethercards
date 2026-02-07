import { Link, useLocation } from "wouter";
import { Wallet, Menu, X, Gamepad2 } from "lucide-react";
import { useWallet } from "../hooks/use-wallet";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [location] = useLocation();
    const { address, balance, isConnected, connect, isConnecting } = useWallet();

    const navLinks = [
        { href: "/", label: "Store" },
        { href: "/collection", label: "My Collection" },
        { href: "/arena", label: "Arena" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/public" className="flex items-center space-x-2 group">
                        <div className="p-2 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                            <Gamepad2 className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              ETHER<span className="text-primary">CARDS</span>
            </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    location === link.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Wallet Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isConnected ? (
                            <div className="flex items-center space-x-3 px-4 py-2 rounded-full bg-secondary border border-border/50">
                                <div className="text-sm font-medium text-primary">
                                    {parseFloat(balance || "0").toFixed(4)} ETH
                                </div>
                                <div className="h-4 w-px bg-border" />
                                <div className="text-xs text-muted-foreground font-mono">
                                    {address?.slice(0, 6)}...{address?.slice(-4)}
                                </div>
                            </div>
                        ) : (
                            <Button
                                onClick={connect}
                                disabled={isConnecting}
                                className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                            >
                                <Wallet className="w-4 h-4 mr-2" />
                                {isConnecting ? "Connecting..." : "Connect Wallet"}
                            </Button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:text-white"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-border bg-background">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-3 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-white hover:bg-secondary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-border">
                            {isConnected ? (
                                <div className="px-3 py-3 rounded-md bg-secondary/50">
                                    <div className="text-sm text-muted-foreground mb-1">Connected as</div>
                                    <div className="font-mono text-sm text-white truncate">{address}</div>
                                    <div className="mt-2 text-primary font-bold">{parseFloat(balance || "0").toFixed(4)} ETH</div>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => {
                                        connect();
                                        setIsOpen(false);
                                    }}
                                    className="w-full"
                                >
                                    <Wallet className="w-4 h-4 mr-2" />
                                    Connect Wallet
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}