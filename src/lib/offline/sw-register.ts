/**
 * Service Worker Registration — PWA + Offline Mode
 *
 * El POS debe funcionar SIN INTERNET:
 * - Cache de productos, precios, stock (pre-descargados)
 * - Ventas se almacenan en IndexedDB y se sincronizan al volver online
 * - Event sourcing: cada acción offline = evento inmutable
 */

export async function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    console.warn("[SW] Service Workers no soportados");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });

    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "activated") {
          console.log("[SW] Nueva versión activada");
          // Notificar al usuario que hay actualización disponible
          window.dispatchEvent(new CustomEvent("sw-updated"));
        }
      });
    });

    console.log("[SW] Registrado exitosamente");
    return registration;
  } catch (error) {
    console.error("[SW] Error al registrar:", error);
  }
}

// ── Detectar estado online/offline ──
export function setupOnlineDetection(
  onOnline: () => void,
  onOffline: () => void
) {
  window.addEventListener("online", () => {
    console.log("[Network] Conexión restaurada");
    onOnline();
  });

  window.addEventListener("offline", () => {
    console.log("[Network] Sin conexión");
    onOffline();
  });

  // Estado inicial
  if (!navigator.onLine) {
    onOffline();
  }
}
