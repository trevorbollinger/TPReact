# Generated by Django 4.2.16 on 2024-11-07 22:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0007_convert_score_to_json'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gamescore',
            name='score',
            field=models.JSONField(),
        ),
    ]