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
