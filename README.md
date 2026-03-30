# Portfolio — Amani Kajemba Justin

Portfolio numérique développé avec **PHP Symfony 7.4**, **Tailwind CSS v4** et **AssetMapper**.
Il est multilingue (Français / English / Swahili) et comprend un formulaire de contact fonctionnel.

---

## Prérequis

| Outil        | Version minimale |
|--------------|-----------------|
| PHP          | 8.2             |
| Composer     | 2.x             |
| Node.js      | 18.x            |
| npm          | 9.x             |
| Symfony CLI  | (recommandé)    |

---

## Installation

### 1. Cloner / copier le projet

```bash
cd C:\Users\KajembaJustinAmani\portfolio
```

### 2. Installer les dépendances PHP

```bash
composer install
```

### 3. Installer les dépendances JavaScript

```bash
npm install
```

### 4. Configurer les variables d'environnement

Copier `.env` en `.env.local` et adapter :

```bash
cp .env .env.local
```

Éditer `.env.local` :

```dotenv
APP_ENV=dev
APP_SECRET=change_me_in_production_use_a_random_32char_string
# Pour le développement local, les emails sont ignorés (null transport)
MAILER_DSN=null://null
# Pour la production SMTP :
# MAILER_DSN=smtp://user:password@smtp.votre-fournisseur.com:587
CONTACT_EMAIL=justamnkaj@gmail.com
```

### 5. Générer les assets CSS/JS

```bash
npm run dev          # développement (avec watch)
npm run build        # production (minifié)
```

### 6. Vider le cache Symfony

```bash
php bin/console cache:clear
```

### 7. Lancer le serveur de développement

Avec la Symfony CLI :
```bash
symfony serve
```

Ou avec le serveur PHP intégré :
```bash
php -S localhost:8000 -t public
```

Le site est accessible sur **http://localhost:8000** (ou **http://127.0.0.1:8080** avec `symfony serve`).

---

## Photo de profil

Placer votre photo dans :

```
public/images/profile.jpg
```

Si le fichier est absent, les initiales **AKJ** s'affichent à la place.

---

## Langues disponibles

| URL              | Langue   |
|------------------|----------|
| `/fr`            | Français |
| `/en`            | English  |
| `/sw`            | Swahili  |

Le sélecteur de langue en haut à droite permet de basculer entre FR et EN/SW.

---

## Formulaire de contact

Le formulaire envoie les messages par email via **Symfony Mailer**.

- En `dev` avec `MAILER_DSN=null://null`, les emails sont enregistrés dans le **Web Profiler** (onglet *Emails*).
- En production, configurer un vrai transport SMTP ou un service comme **Mailgun**, **Postmark**, ou **SendGrid**.

---

## Structure du projet

```
portfolio/
├── assets/
│   ├── app.js               # JS principal (AOS, particules, formulaire)
│   └── styles/app.css       # Tailwind CSS v4 + utilitaires personnalisés
├── config/
│   ├── packages/
│   │   ├── mailer.yaml
│   │   ├── translation.yaml
│   │   └── ...
│   └── routes.yaml
├── public/
│   ├── images/              # Photo de profil (profile.jpg)
│   └── index.php
├── src/
│   ├── Controller/
│   │   └── PortfolioController.php
│   └── Form/
│       └── ContactType.php
├── templates/
│   ├── base.html.twig
│   ├── emails/
│   │   └── contact.html.twig
│   └── portfolio/
│       ├── index.html.twig
│       └── sections/
│           ├── hero.html.twig
│           ├── about.html.twig
│           ├── skills.html.twig
│           ├── experience.html.twig
│           ├── education.html.twig
│           ├── projects.html.twig
│           ├── contact.html.twig
│           └── footer.html.twig
└── translations/
    ├── messages.fr.yaml
    ├── messages.en.yaml
    └── messages.sw.yaml
```

---

## Production

```bash
composer install --no-dev --optimize-autoloader
npm run build
APP_ENV=prod APP_DEBUG=0 php bin/console cache:clear
APP_ENV=prod APP_DEBUG=0 php bin/console cache:warmup
```

---

*Conçu et développé par **Amani Kajemba Justin***
