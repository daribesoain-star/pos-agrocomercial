import { useState, useCallback, useContext } from "react";
import type { PedidoPOS, LineaPedidoPOS, ClientePOS } from "@/types/pos";

export interface UsePedidoState {
  pedido: PedidoPOS | null;
  lineas: LineaPedidoPOS[];
  cliente: ClientePOS | null;
  esClub: boolean;
  descuento: number;
  subtotal: number;
  impuesto: number;
  total: number;
  agregarLinea: (linea: LineaPedidoPOS) => void;
  cancelarLinea: (index: number) => void;
  actualizarLinea: (index: number, cantidad: number) => void;
  startNewOrder: (cliente: ClientePOS | null) => void;
  clearOrder: () => void;
}

export function usePedido(clientePreselectedo?: ClientePOS) {{
  const [pedido, setPedido] = useState<PedidoPOS | null>(null);
  const [lineas, setLineas] = useState<LineaPedidoPOS[]>([]);
  const [cliente, setCliente] = useState<ClientePOS | null>(clientePreselectedo || null);
  const [esClub, setEsClub] = useState<boolean>(clientePreselectedo?.esClub || false);
  const [descuento, setDescuento] = useState<number>(0);

  const calculate = useCallback(() => {
    const sub = lineas.reduce((acc, l) => acc + l.subtotal, 0);
    const imp = sub * 0.19;
    const desc = esClub ? sub * 0.1 : descuento;
    const tot = sub + imp - desc;

    return { sub, imp, desc, tot };
  }, [lineas, esClub, descuento]);

  const agregarLinea = useCallback((linea: LineaPedidoPOS) => {
    setLineas([...lineas, linea]);
  }, [lineas]);

  const cancelarLinea = useCallback((index: number) => {
    setLineas(lineas.filter((_, i) => i !== index));
  }, []);

  return {
    pedido,
    lineas,
    cliente,
    esClub,
    descuento,
    subtotal: calculate().sub,
    impuesto: calculate().imp,
    total: calculate().tot,
    agregarLinea,
    cancelarLinea,
    actualizarLinea: (index, cantidad) => {
      const nuevas = [...lineas];
      nuevas[index].cantidad = cantidad;
      setLineas(nuevas);
    },
    startNewOrder: (cliente) => {
      setCliente(cliente);
      setEsClub(cliente?.esClub || false);
      setLineas([]);
    },
    clearOrder: () => {
      setPedido(null);
      setCliente(null);
      setLineas([]);
      setDescuento(0);
      setEsClub(false);
    },
  };
}
