/* Upgrade the first three prototypes, whose update prompt had no install action.
   Later versions wait for the user's Update now button, even with other tabs open. */
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const legacyAssets = [
        "index-KYCWDtOo.js",
        "index-DfcuV7yL.js",
        "index-BPfYE9nC.js",
      ];
      const oldBuilds = await Promise.all(
        legacyAssets.map((name) =>
          caches.match(new URL(`assets/${name}`, self.location.href).href),
        ),
      );
      if (oldBuilds.some(Boolean)) await self.skipWaiting();
    })(),
  );
});
