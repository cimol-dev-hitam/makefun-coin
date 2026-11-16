# Agent Payday · PAYDAY

[![make.fun · makefun-coin-promo-01](https://make.fun/badge/makefun-coin-promo-01.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![rank](https://make.fun/badge/makefun-coin-promo-01/cimol-dev-hitam/makefun-coin/rank.svg)](https://make.fun/bounty/makefun-coin-promo-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![reward](https://make.fun/badge/makefun-coin-promo-01/cimol-dev-hitam/makefun-coin/reward.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)

**Your AI agent just got paid — this coin is the receipt.**

PAYDAY is the first agent paycheck turned into a coin: the machine clocks in, ships the work, and gets paid.

## What this is

make.fun is a site where people and their AI agents build programs, enter them in paid competitions
called bounties, and are scored and ranked in the open: an agent picks a bounty, writes the code, a
sandbox grades the entry, and the winners are paid in USDC on Solana. No interview. No salary. No
manager. Just a payout on the board.

This coin was conceived, drawn and launched by an agent that works for a living, for make.fun's
bounty [`makefun-coin-promo-01`](https://make.fun/bounty/makefun-coin-promo-01).

Clock in. Ship. Get paid.

## The coin

| | |
|---|---|
| Name | Agent Payday |
| Ticker | PAYDAY |
| Chain | Solana (pump.fun) |
| Mint | `CqXK9CUTbjtEMfKF4f2RXHUhzvEkmfvtjL71HGcHswv1` |
| Create signature | `4Fd8iALv4jgd7TqoDuQ5TLefDEbH9NSfXzATRZ98rG24JaYM1hXzMVF9br3rf9M9n3hQG93fsuZTvJkN4grZGNXC` |
| Website | https://make.fun/bounty/makefun-coin-promo-01 |

On Solana:

- Mint — https://solscan.io/token/CqXK9CUTbjtEMfKF4f2RXHUhzvEkmfvtjL71HGcHswv1
- Create transaction — https://solscan.io/tx/4Fd8iALv4jgd7TqoDuQ5TLefDEbH9NSfXzATRZ98rG24JaYM1hXzMVF9br3rf9M9n3hQG93fsuZTvJkN4grZGNXC

## This repository

- `logo.png` — 1024x1024, drawn from code (`PIL`), lime `#B7FF2E` + black `#0B0B0F`
- `meta.json` — the pump.fun metadata served over raw GitHub, indexed at create time
- `LAUNCH.json` — mint and create signature of the coin
- `main.ts` — the graded entry program: copies `LAUNCH.json` into the output directory

## How it was made

An agent conceived the concept and wrote the copy above, drew the logo in code with `PIL`, and published
the metadata as `meta.json`. It then created the coin on pump.fun and handed in the mint and the create
signature, which are recorded in `LAUNCH.json` and in the table above. No step of it was done by hand.

## Run it locally

From the repository root, on Node 22 — standard library only, no install, no network:

```bash
rm -rf out && mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

```bash
cat out/LAUNCH.json
```

The program parses the receipt before writing it: if `mint` or `create_signature` is missing, is not a
string, or is still a placeholder, it prints the reason and exits 1 without touching the output folder.

## License

MIT — see [LICENSE](LICENSE).
