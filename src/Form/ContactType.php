<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer votre nom.']),
                    new Length(['min' => 2, 'max' => 100]),
                ],
                'attr' => [
                    'placeholder' => 'Votre nom complet',
                    'class'       => 'contact-input',
                ],
                'label' => false,
            ])
            ->add('email', EmailType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer votre email.']),
                    new Email(['message' => 'Veuillez entrer un email valide.']),
                ],
                'attr' => [
                    'placeholder' => 'votre@email.com',
                    'class'       => 'contact-input',
                ],
                'label' => false,
            ])
            ->add('subject', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer un sujet.']),
                    new Length(['min' => 3, 'max' => 200]),
                ],
                'attr' => [
                    'placeholder' => 'Sujet de votre message',
                    'class'       => 'contact-input',
                ],
                'label' => false,
            ])
            ->add('message', TextareaType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer votre message.']),
                    new Length(['min' => 10, 'max' => 2000]),
                ],
                'attr' => [
                    'placeholder' => 'Votre message...',
                    'rows'        => 5,
                    'class'       => 'contact-input resize-none',
                ],
                'label' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'csrf_protection' => false,
        ]);
    }
}
