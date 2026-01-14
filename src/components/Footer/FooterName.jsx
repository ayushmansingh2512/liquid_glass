import { motion } from 'framer-motion';

const FooterName = () => {
    return (
        <div className="footer-content">
            <motion.h1
                className="footer-name"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                Aditya PS.
            </motion.h1>
        </div>
    )
}

export default FooterName;
