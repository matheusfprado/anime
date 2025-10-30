"use client";

import { motion } from "framer-motion";

export function CharacterModal({ character, onClose }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fundo escurecido com fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95 backdrop-blur-[4px] cursor-pointer"
      />

      {/* Container principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 bg-gradient-to-b from-zinc-900/80 to-black/80 border border-yellow-500/20 rounded-2xl shadow-[0_0_40px_rgba(255,200,0,0.25)] backdrop-blur-xl p-8 w-[90%] max-w-md text-center overflow-hidden"
      >
        {/* botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-400 hover:text-yellow-400 text-xl transition"
        >
          ✕
        </button>

        {/* brilho suave atrás do personagem */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent blur-3xl" />

        {/* imagem do personagem */}
        <motion.img
          src={character.image}
          alt={character.name}
          className="h-40 w-40 mx-auto mb-5 object-cover rounded-full border border-yellow-400/30 shadow-[0_0_40px_rgba(255,200,0,0.25)]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* nome e história */}
        <h3 className="text-2xl font-extrabold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,200,0,0.4)] mb-3">
          {character.name}
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed">
          {character.story}
        </p>

        {/* brilho no rodapé */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
      </motion.div>
    </div>
  );
}
