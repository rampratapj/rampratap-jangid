# Portfolio Preview Instructions

The live portfolio is currently served from the `main` branch:

```text
https://rampratapj.github.io/rampratap-jangid/
```

The proposed changes are in this branch:

```text
portfolio-improvements
```

## Safe preview options

### Option 1: Local preview

Clone the repository and switch to the preview branch:

```bash
git clone https://github.com/rampratapj/rampratap-jangid.git
cd rampratap-jangid
git checkout portfolio-improvements
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

### Option 2: GitHub Pages branch preview

GitHub Pages normally serves one selected branch/folder at a time for a repository.

To preview this branch through GitHub Pages without merging:

1. Go to repository Settings.
2. Open Pages.
3. Under Build and deployment, select Deploy from a branch.
4. Temporarily change the branch from `main` to `portfolio-improvements` and folder to `/root`.
5. Save.
6. Open the existing GitHub Pages URL after deployment completes.
7. After review, switch the Pages branch back to `main` if you do not want the preview branch public.

Important: changing Pages source to `portfolio-improvements` will temporarily update the public GitHub Pages URL. For a private/non-public preview, use local preview.