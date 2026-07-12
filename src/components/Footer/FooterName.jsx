import { motion } from 'framer-motion';

const FooterName = () => {
    return (
        <div className="footer-content">
            <motion.h1
                className="footer-name"
                initial={{ y: 30, x: "-50%", opacity: 0 }}
                whileInView={{ y: 0, x: "-50%", opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                Aditya PS.
            </motion.h1>
        </div>
    )
}

export default FooterName;
