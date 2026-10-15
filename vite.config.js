import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Port 3000 isliye ki backend ke CORS me sirf localhost:3000 / 3001 allowed hai
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
});
