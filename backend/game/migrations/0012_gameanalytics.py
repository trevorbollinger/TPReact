# Generated by Django 4.2.16 on 2024-11-09 18:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('game', '0011_gamescore_hard_mode'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameAnalytics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('score', models.JSONField()),
                ('streak', models.IntegerField(default=0)),
                ('iteration', models.IntegerField()),
                ('hard_mode', models.BooleanField(default=False)),
                ('user_agent', models.TextField(blank=True, null=True)),
                ('browser', models.CharField(blank=True, max_length=100, null=True)),
                ('browser_version', models.CharField(blank=True, max_length=50, null=True)),
                ('operating_system', models.CharField(blank=True, max_length=50, null=True)),
                ('device_type', models.CharField(blank=True, max_length=50, null=True)),
                ('screen_resolution', models.CharField(blank=True, max_length=50, null=True)),
                ('language', models.CharField(blank=True, max_length=10, null=True)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]