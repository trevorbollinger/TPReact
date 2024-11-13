# Generated by Django 4.2.16 on 2024-11-07 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_gamescore_iteration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamescore',
            name='score',
            field=models.JSONField(help_text="Array of 'y' or 'n' characters representing correct/incorrect answers"),
        ),
    ]
