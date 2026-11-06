# Design notes (branch v137-terra, build v139+)

## Run types (the four things a system card offers)
| Run | Engine | Goal | Pays | Stakes |
|---|---|---|---|---|
| Trade | ship | reach the gate | credits, crates, cargo | lose the run |
| Attack | ship | reach the gate with a pursuer | credits, Legend (planned: crew) | lose the run |
| Survey | planet | fill progress to 100% | **Data** (kept even on failure) | none; repeat surveys pay 30% less each (floor 25%) |
| Terraform | planet | fill progress to 100% | credits, Alloy, world counts toward the Exodus Gate | fail or abandon = world destroyed; win = settlers stay |
| Exodus (gate) | ship | all three phases in one | next constellation | as before |

Terraform is greyed out until the system has at least one cleared run and enough crew aboard.

## Planet engine (G.terra; G.survey for Survey)
- Same five tile families as ship runs: Radiation, Pressure, Water, Temperature, Oxygen. Gravity = Hull gauge (left), Oxygen = Fuel gauge (right).
- Hazards from the right: comet, swarm, eruption (damage Gravity), storm, surge (drain Oxygen), seed (refills Oxygen).
- Planet layers are driven by what you match (`G.tl`), plus progress as the base. Frame/background colours follow planet state (`terraFrame`, `drawTerraBG`); Survey uses a cool-blue palette.
- Survey swaps the Credits tile for the Data tile (`skinTerra(on, survey)` mutates `BUCKS_DEF`/`ICONS[BUCKS]`; `skinTerra(false)` restores).
- Overdrive and the pursuer gap are off in planet runs.

## Tach vial retired
- Overdrive "Slow time" now costs fuel (`SLOW_FUEL`, 8; Reserve cell relic: -4). Old vials are refunded as 4 Alloy each (`ensureStation`).
- Dormant: Tach drive room still gates Overdrive; `Tach 9` is still the title/working name (`GAME_NAME`).

## Planet upgrades, subsystems, events (v140)
- Sensors room = planet side. Five rows (Radiation, Pressure, Water, Temperature, Oxygen), ranks 0-4 bought with Data (12/28/48/75), highest rank = Sensors level. Same engine as ship upgrades (`stats0` reads `S.pup` while `TERRA_STATS`): +2 capacity per rank, +1 charge per match at ranks 2 and 4; Pressure = max Gravity, Water = earlier hazard warning, Temperature = slower Oxygen drain, Oxygen = tank and Oxygen per tile.
- The Shipyard (S.up) and ship subsystems no longer affect planet runs.
- Planet subsystems (`PRELICS`, 3 slots, `S.prel`): Gravity bulwark, Aerators, Buffer banks, Scrubbers, Ablative shield, Cryo vents, Radiation baffles, Spillways, Seed beacon, Data uplink, Colony kit. Offered 3-of on Survey wins, 2-of on Terraform wins and by the Seed vault anomaly; picked in an offer screen (reopen from the Sensors room).
- New anomalies: Survey archive, Drifting probe, Seed vault. Beacon, Flux, Rift and Signal options now also pay Data.
- Old reel calibrations (`S.station.cal`) are no longer spent or shown; the three old-reel relics are retired from the offer pool.

## Known leftovers / candidates for removal (not yet done)
- Old reels engine: `openTerra`, `tfPlan`, `TF`, `tfMod*`, Test Terraform debug row, `tfLog`, Terra-reel calibrations (`S.station.cal`) -> convert to Sensors upgrades bought with Data.
- Relics tied to old reels: `ballast`, `seismic`, `dampener` (orphaned once the old screen goes).
- Terraform tokens (`S.bag`, `bagNow`) are dead code.
- Survey veil code (`surveyVeil` now always false; `UNSURVEYED` strings remain unreachable).
- Old Survey depth features (storm env, flares-required, fast flight) now only matter for the Exodus run; `FORCED[2]`, `DEPTH_UNL`, `depthOutline` still describe depth 2 partly.
- Briefing for planet runs still shows the ship tile-loadout row (flare tile etc.).
- Legacy "Tach drive / galaxy" jump path (`openTach`, research) still exists for non-constellation saves.
- Pre-existing: 2 of 6 built-in smoke tests fail on main too (research, captain tips) because they assume non-constellation mode.

## Planned
1. Data -> Sensors upgrade rows (Terra-reel calibrations become planet-run upgrades).
2. Attack runs gain crew; repeat Attack raises system threat.
3. Chain combos/Overdrive tagged Terraform / Runs / Both.
4. Longer win/fail cinematic in the planet viewport.
5. Exodus run keeps storm + gap; remove them from Survey code paths entirely.

## v141
- Restored green (#38e09b) everywhere the Oxygen grey swap had spilled (Sensors colour etc.); grey stays only for planet-run Oxygen.
- Terraform runs no longer load Afterburner or Credits/Crates tiles (load = line, nova). Survey loads line, nova, loot (Data).
- Removed the old Terraform token bag (G.bag accumulation and debrief row). `bagNow/bagTotal` and `.tf-bag` CSS remain as dead code for the reels cleanup.
- Terraform/Survey now end in the standard debrief screen (`d.terra`, `d.noPay`) with a planet instead of the ship; skin is restored in goMap/goStation.
- Terraform finale: win 4.8 s (planet morphs barren to lush, shock rings, sparks, flash, caption pops), loss 3.4 s (fracture flash, debris, collapse).

## v142
- Terraform now needs a win of each run type (Trade, Attack, Survey) at that system: st.rt[0..2], shown as 'next: <run>' on the card.
- New training lesson 'Run types and planet boards' compares Trade/Attack/Survey/Terraform tile systems; stale tips (research, Survey flares) updated; first-time tips for planet runs.

## v143
- Launch cinematics (launchCine): Trade zoom-in, Attack orbit with chaser and bolts, Survey hover and scan, Terraform planet focus with reels and frame. Tap to skip; skipped under reduced motion; failsafe resolves it.
- Map: extra pan room equal to the star details panel height (chartOcc) and auto-pan so the selected star clears the panel.

## v145
- Terraform gate revised: a new game needs a win of each run type once (S.rtG, global, order shown as 'next: <run>'). After that (S.tfU set on the first Terraform win) one cleared run at a system is enough. Tester feedback may relax this to always-open.

## v146
- Room submenu button (#rcOpenBox) now sits above the room card, below the room tabs. Sensors room text updated for Data planet upgrades.

## v147
- Nav labels use the player's ship name (shipTag(n) truncates with an ellipsis: map button 9, debrief 8, hangar tab 7; ship screen title and flight report use the full name). Falls back to 'Ship'.

## v148 — Splash planet, rename to Exodus Run
- Splash: terraform planet at mid-left runs a 30s loop (terraform → lush → destruction → gone/debris → reform), reusing terraPlanetPaint (saves/restores _tpImg).
- Removed splash eyebrow ("Ship log") and tagline. Title now "Exodus Run" (GAME_NAME; head title, apple title, manifest, install text).
- SW cache prefix stays tach9-vNNN; save keys unchanged. Logo/icons still old.

## v149 — Sequence fix, Pilot Tips
- Survey Run now unlocks after 2 cleared runs (DEPTH_UNL [0,1,2], was 3), so new game order is Trade > Attack > Survey > Terraform; free choice afterwards. Map "Depth" tip explains it.
- "Tutorial" at new campaign / Options renamed Pilot Tips (Training remains the scripted, can't-lose mode).

## v150 — Survey win counts as a clear
- Bug: a won Survey Run never incremented st.clears, so Terraform stayed "fly a run here first". Survey wins now add a clear, and stCleared(st) also accepts any recorded run type (st.rt) so existing saves heal.

## v151 — Terraform polish
- scopeLine(): viewport/banner text per run type (Survey/Terraform/pursuit/storm/all clear) instead of always "<pursuer> ON SCOPE".
- Terraform launch asks for a do-or-die confirmation; Credits counter hidden in Terraform runs (shown as Data in Survey).
- Failed Terraform = Destroyed system: debris mark on map and card, Launch/Terraform disabled, toast on attempt. Terraformed worlds radiate green on the map.

## v152 — Exodus Gate cinematics
- launchCine modes 'gate' (ship approaches the opening Exodus Gate, deep thoom, shake, flash) and 'arrive' (gate flash, hyperspace streaks settle into a star field, ship emerges).
- Exodus Run launch uses 'gate'. Jump On plays 'gate' then, after the new constellation is generated, 'arrive' before the map reveals. Reduced-motion skips both.
- Noted for later: no Gate keys in the game.

## v153 — Exodus Run staging
- Pulsar: body.exo brightness pulse on board+viewport, period 4.2s→1.25s as the gate nears; each beat plays a thoom whose pitch, length and volume rise with progress (plus screen shake late).
- Viewport: much larger Exodus Gate (grows and slides toward the ship, rotating rings, inflow sparks) and animated drifting debris (34 chunks, faster/larger near the gate). Normal jump-gate drawing skipped for gate runs.
- Pilot speech at 3/14/50/78/92% progress, on top of the existing stage barks.
