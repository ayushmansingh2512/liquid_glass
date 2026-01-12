import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuOverlay.css';

const menuLinks = [
    { title: "Home", href: "#" },
    { title: "My Experiences", href: "#my-experiences" },
    { title: "Blog", href: "#blog" },
    { title: "Resume", href: "https://drive.google.com/file/d/1yNpPA3WGhI_-a3C6SXfZQoAXNy2P0qi5/view?usp=drivesdk" },
    { title: "Contact", href: "https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" },
];

const MenuOverlay = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="menu-backdrop"
                    />

                    {/* Menu Container - Slides down from top */}
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{
                            y: "0%",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                        exit={{
                            y: "-100%",
                            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                        }}
                        className="menu-container"
                    >
                        {/* Links Container with staggered animation */}
                        <div className="menu-links-wrapper">
                            {menuLinks.map((link, index) => (
                                <div key={index} className="menu-link-overflow">
                                    <motion.div
                                        initial={{ y: "100%" }}
                                        animate={{
                                            y: "0%",
                                            transition: { delay: 0.4 + (index * 0.1), duration: 0.5, ease: "easeOut" }
                                        }}
                                        exit={{ y: "100%", transition: { duration: 0.3 } }}
                                    >
                                        <RollingLink
                                            href={link.href}
                                            title={link.title}
                                            onClick={onClose}
                                        />
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Footer / Socials in Menu */}
                        <div className="menu-footer">
                            <span className="menu-footer-email">adityaps@example.com</span>
                            <div className="menu-footer-socials">
                                <a href="https://www.instagram.com/aditya_ps219/?hl=en" target="_blank" rel="noreferrer" className="menu-footer-link">Instagram</a>
                                <a href="https://www.linkedin.com/in/aditya-pratap-singh-8672581aa/" target="_blank" rel="noreferrer" className="menu-footer-link">LinkedIn</a>
                                <a href="https://www.behance.net/aditya219" target="_blank" rel="noreferrer" className="menu-footer-link">Behance</a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Sub-component for the Hover Effect (Rolling Text)
const RollingLink = ({ href, title, onClick }) => {
    return (
        <motion.a
            href={href}
            onClick={onClick}
            target={href.startsWith('http') ? "_blank" : "_self"}
            rel="noreferrer"
            initial="initial"
            whileHover="hovered"
            className="menu-link-large"
            style={{ position: 'relative', display: 'block', overflow: 'hidden' }}
        >
            {/* Original Text - Moves Up on Hover */}
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hovered: { y: "-100%" },
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
                {title}
            </motion.div>

            {/* Duplicate Text - Comes from Bottom on Hover */}
            <motion.div
                style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                variants={{
                    initial: { y: "100%" },
                    hovered: { y: 0 },
                }}
                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
                {title}
            </motion.div>
        </motion.a>
    );
};

export default MenuOverlay;
