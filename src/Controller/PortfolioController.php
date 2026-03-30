<?php

namespace App\Controller;

use App\Form\ContactType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

class PortfolioController extends AbstractController
{
    private const CONTACT_EMAIL = 'justamnkaj@gmail.com';
    private const OWNER_NAME    = 'Amani Kajemba Justin';
    private const OWNER_PHONE   = '54509044';
    private const OWNER_ADDRESS = '28 Einstein Av, Ollier, Quatre-Bornes';

    #[Route('/{_locale}', name: 'app_portfolio', requirements: ['_locale' => 'fr|en|sw'], defaults: ['_locale' => 'fr'])]
    public function index(Request $request): Response
    {
        $skills = [
            ['name' => 'PHP / Symfony', 'icon' => 'code-2',   'level' => 85],
            ['name' => 'HTML / CSS',    'icon' => 'palette',   'level' => 90],
            ['name' => 'JavaScript',    'icon' => 'zap',       'level' => 75],
            ['name' => 'React Native',  'icon' => 'smartphone','level' => 70],
            ['name' => 'SQL / MySQL',   'icon' => 'database',  'level' => 80],
            ['name' => 'CRM & Suivi',   'icon' => 'headphones','level' => 75],
        ];

        $languages = [
            ['name' => 'Français', 'level' => 95],
            ['name' => 'Anglais',  'level' => 50],
            ['name' => 'Swahili',  'level' => 95],
        ];

        return $this->render('portfolio/index.html.twig', [
            'name'      => self::OWNER_NAME,
            'email'     => self::CONTACT_EMAIL,
            'phone'     => self::OWNER_PHONE,
            'address'   => self::OWNER_ADDRESS,
            'skills'    => $skills,
            'languages' => $languages,
        ]);
    }

    #[Route('/', name: 'app_home')]
    public function home(): Response
    {
        return $this->redirectToRoute('app_portfolio', ['_locale' => 'fr']);
    }

    #[Route('/contact', name: 'app_contact', methods: ['POST'])]
    public function contact(Request $request, MailerInterface $mailer): JsonResponse
    {
        $form = $this->createForm(ContactType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $data = $form->getData();

            try {
                $email = (new Email())
                    ->from(new Address(self::CONTACT_EMAIL, 'Portfolio - ' . self::OWNER_NAME))
                    ->to(self::CONTACT_EMAIL)
                    ->replyTo(new Address($data['email'], $data['name']))
                    ->subject('Portfolio — Message de ' . $data['name'] . ' : ' . $data['subject'])
                    ->html($this->renderView('emails/contact.html.twig', [
                        'senderName'    => $data['name'],
                        'senderEmail'   => $data['email'],
                        'subject'       => $data['subject'],
                        'message'       => $data['message'],
                        'ownerName'     => self::OWNER_NAME,
                    ]));

                $mailer->send($email);

                return new JsonResponse([
                    'success' => true,
                    'message' => 'Votre message a été envoyé avec succès ! Je vous répondrai bientôt.',
                ]);
            } catch (\Exception $e) {
                return new JsonResponse([
                    'success' => false,
                    'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.',
                ], 500);
            }
        }

        $errors = [];
        foreach ($form->getErrors(true) as $error) {
            $errors[] = $error->getMessage();
        }

        return new JsonResponse([
            'success' => false,
            'message' => implode(' ', $errors) ?: 'Veuillez vérifier les champs du formulaire.',
        ], 400);
    }
}
