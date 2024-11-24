# Makefile

.PHONY: install publish gendiff

install: # Установка зависимостей
	npm ci

publish:
	npm publish --dry-run

gendiff: # Запуск приложения
	node bin/gendiff.js
