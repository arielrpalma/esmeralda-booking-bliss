import { Search, CalendarDays, BedDouble, Tag, Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BASE_URL =
  "https://frame2.hotelpms.io/BookingFrameClient/hotel/4999DCF40A49BFB3D5A6C22E1174000D/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms";

type Room = {
  adults: number;
  children: number;
  babies: number;
};

const FloatingBookingBar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [roomsList, setRoomsList] = useState<Room[]>([{ adults: 2, children: 0, babies: 0 }]);
  const [promoCode, setPromoCode] = useState("");
  const [roomsOpen, setRoomsOpen] = useState(false);

  const totalGuests = roomsList.reduce((sum, r) => sum + r.adults + r.children + r.babies, 0);

  const updateRoom = (index: number, field: keyof Room, delta: number) => {
    setRoomsList((prev) =>
      prev.map((room, i) => {
        if (i !== index) return room;
        const newVal = room[field] + delta;
        if (field === "adults" && newVal < 1) return room;
        if (newVal < 0) return room;
        // Max 3 between adults + children per room (babies don't count)
        if (field === "adults" || field === "children") {
          const newAdults = field === "adults" ? newVal : room.adults;
          const newChildren = field === "children" ? newVal : room.children;
          if (newAdults + newChildren > 3) return room;
        }
        return { ...room, [field]: newVal };
      })
    );
  };

  const addRoom = () => {
    if (roomsList.length < 5) {
      setRoomsList((prev) => [...prev, { adults: 2, children: 0, babies: 0 }]);
    }
  };

  const removeRoom = (index: number) => {
    if (roomsList.length > 1) {
      setRoomsList((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("currency", "ARS");
    params.set("language", "es-ES");
    if (checkIn) params.set("checkin", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkout", format(checkOut, "yyyy-MM-dd"));
    params.set("rooms", String(roomsList.length));
    params.set("guests", String(totalGuests));
    params.set("rp", promoCode);
    window.open(`${BASE_URL}?${params.toString()}`, "_blank");
  };

  const roomsSummary = `${roomsList.length} depto${roomsList.length > 1 ? "s" : ""}. · ${totalGuests} huésp.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="bg-section-dark/95 backdrop-blur-md border-t border-border/20 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-5xl mx-auto">
            {/* Llegada */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Llegada
                    </span>
                    <span className={cn("text-sm font-body", checkIn ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>
                      {checkIn ? format(checkIn, "dd MMM yyyy", { locale: es }) : "Seleccionar"}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Salida */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Salida
                    </span>
                    <span className={cn("text-sm font-body", checkOut ? "text-section-dark-foreground" : "text-section-dark-foreground/40")}>
                      {checkOut ? format(checkOut, "dd MMM yyyy", { locale: es }) : "Seleccionar"}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={8}>
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < (checkIn || new Date())}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>

            {/* Habitaciones */}
            <Popover open={roomsOpen} onOpenChange={setRoomsOpen}>
              <PopoverTrigger asChild>
                <button className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2 text-left">
                  <BedDouble size={16} className="text-primary shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                      Departamentos
                    </span>
                    <span className="text-sm font-body text-section-dark-foreground">
                      {roomsSummary}
                    </span>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[420px] p-0 pointer-events-auto"
                align="center"
                side="top"
                sideOffset={8}
              >
                <div className="p-5">
                  <h3 className="text-base font-semibold text-foreground mb-4">Habitaciones</h3>

                  {/* Header row */}
                  <div className="grid grid-cols-[1fr_80px_80px_80px_28px] gap-2 mb-2 text-center">
                    <div />
                    <span className="text-xs font-semibold text-foreground">Adultos</span>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Menores
                      <span className="block text-[10px] font-normal text-muted-foreground">3-14 años</span>
                    </span>
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      Bebés
                      <span className="block text-[10px] font-normal text-muted-foreground">&lt; 2 años</span>
                    </span>
                    <div />
                  </div>

                  <div className="border-t border-border" />

                  {/* Room rows */}
                  {roomsList.map((room, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[1fr_80px_80px_80px_28px] gap-2 items-center py-3 border-b border-border/50"
                    >
                      <span className="text-sm font-medium text-foreground">
                        Habitación {idx + 1}
                      </span>

                      {/* Adults */}
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => updateRoom(idx, "adults", -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
                          disabled={room.adults <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-4 text-center">{room.adults}</span>
                        <button
                          onClick={() => updateRoom(idx, "adults", 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Children */}
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => updateRoom(idx, "children", -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
                          disabled={room.children <= 0}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-4 text-center">{room.children}</span>
                        <button
                          onClick={() => updateRoom(idx, "children", 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Babies */}
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => updateRoom(idx, "babies", -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors disabled:opacity-30"
                          disabled={room.babies <= 0}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-4 text-center">{room.babies}</span>
                        <button
                          onClick={() => updateRoom(idx, "babies", 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Remove */}
                      {roomsList.length > 1 ? (
                        <button
                          onClick={() => removeRoom(idx)}
                          className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      ) : (
                        <div className="w-6" />
                      )}
                    </div>
                  ))}

                  {/* Add room */}
                  {roomsList.length < 5 && (
                    <button
                      onClick={addRoom}
                      className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-3"
                    >
                      <Plus size={16} />
                      Agregar Habitación
                    </button>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                    <button
                      onClick={() => setRoomsOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => setRoomsOpen(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Código Promocional */}
            <div className="flex-1 flex items-center gap-2 bg-section-dark-foreground/10 rounded-md px-3 py-2">
              <Tag size={16} className="text-primary shrink-0" />
              <div className="flex-1">
                <span className="text-[10px] font-body font-semibold tracking-wider uppercase text-section-dark-foreground/60 block leading-none mb-1">
                  Código Promo
                </span>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Opcional"
                  className="w-full bg-transparent text-sm font-body text-section-dark-foreground placeholder:text-section-dark-foreground/40 focus:outline-none"
                />
              </div>
            </div>

            {/* Buscar */}
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-6 py-3 font-body text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl shrink-0"
            >
              <Search size={18} />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingBookingBar;
