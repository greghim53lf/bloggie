import { Footer } from "flowbite-react"
import { Link } from "react-router-dom"
import { FaBehance, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"

export default function FooterComponent() {
    return (
        <Footer container className="border border-t-8 border-teal-500">
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid wifull justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link
                            to="/"
                            className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
                        >
                            <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-orange-400 to-rose-700 rounded-lg text-white">
                                BLOGGIE
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                        <Footer.Title title="About" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                News
                            </Footer.Link>
                            <Footer.Link href="/about" target="_blank" rel="noopener noreferrer">
                                Blog
                            </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title="FOLLOW US" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="https://www.github.com/greghim53lf" target="_blank" rel="noopener noreferrer">
                                Github
                            </Footer.Link>
                            <Footer.Link href="https://www.discord.com/" target="_blank" rel="noopener noreferrer">
                                Discord
                            </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                        <Footer.Title title="LEGAL" />
                        <Footer.LinkGroup col>
                            <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                                Terms &amp; Conditions
                            </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider/>
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <Footer.Copyright href="#" by="Bloggie" year={new Date().getFullYear()} />
                        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                            <Footer.Icon href="https://www.facebook.com/greghim53lf" icon={FaFacebook}/>
                            <Footer.Icon href="https://www.instagram.com/greghim53lf" icon={FaInstagram}/>
                            <Footer.Icon href="https://www.twitter.com/greghim53lf" icon={FaTwitter}/>
                            <Footer.Icon href="https://www.github.com/greghim53lf" icon={FaGithub}/>
                            <Footer.Icon href="https://www.behance.com/greghim53lf" icon={FaBehance}/>
                        </div>
                    </div>
            </div>
        </Footer>
    )
}