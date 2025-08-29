<h1 align="center">SteamDB AppID Copier</h1>
<div align="center">

[English](./README.md) | Русский

Расширение для Firefox, которое добавляет удобные кнопки копирования Steam App ID на страницах SteamDB.

![Release Download](https://img.shields.io/github/downloads/megatocha/steamDB-AppID-Copier/total?style=for-the-badge&labelColor=fae5c0&color=%234caf50&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xNyAxN0gxNy4wMU0xNy40IDE0SDE4QzE4LjkzMTkgMTQgMTkuMzk3OCAxNCAxOS43NjU0IDE0LjE1MjJDMjAuMjU1NCAxNC4zNTUyIDIwLjY0NDggMTQuNzQ0NiAyMC44NDc4IDE1LjIzNDZDMjEgMTUuNjAyMiAyMSAxNi4wNjgxIDIxIDE3QzIxIDE3LjkzMTkgMjEgMTguMzk3OCAyMC44NDc4IDE4Ljc2NTRDMjAuNjQ0OCAxOS4yNTU0IDIwLjI1NTQgMTkuNjQ0OCAxOS43NjU0IDE5Ljg0NzhDMTkuMzk3OCAyMCAxOC45MzE5IDIwIDE4IDIwSDZDNS4wNjgxMiAyMCA0LjYwMjE4IDIwIDQuMjM0NjMgMTkuODQ3OEMzLjc0NDU4IDE5LjY0NDggMy4zNTUyMyAxOS4yNTU0IDMuMTUyMjQgMTguNzY1NEMzIDE4LjM5NzggMyAxNy45MzE5IDMgMTdDMyAxNi4wNjgxIDMgMTUuNjAyMiAzLjE1MjI0IDE1LjIzNDZDMy4zNTUyMyAxNC43NDQ2IDMuNzQ0NTggMTQuMzU1MiA0LjIzNDYzIDE0LjE1MjJDNC42MDIxOCAxNCA1LjA2ODEyIDE0IDYgMTRINi42TTEyIDE1VjRNMTIgMTVMOSAxMk0xMiAxNUwxNSAxMiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPg0KPC9zdmc+)
[![GitHub License](https://img.shields.io/github/license/megatocha/steamDB-AppID-Copier?style=for-the-badge&labelColor=fae5c0&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xOSAzSDlWM0M3LjExNDM4IDMgNi4xNzE1NyAzIDUuNTg1NzkgMy41ODU3OUM1IDQuMTcxNTcgNSA1LjExNDM4IDUgN1YxMC41VjE3IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8cGF0aCBkPSJNMTQgMTdWMTlDMTQgMjAuMTA0NiAxNC44OTU0IDIxIDE2IDIxVjIxQzE3LjEwNDYgMjEgMTggMjAuMTA0NiAxOCAxOVY5VjQuNUMxOCAzLjY3MTU3IDE4LjY3MTYgMyAxOS41IDNWM0MyMC4zMjg0IDMgMjEgMy42NzE1NyAyMSA0LjVWNC41QzIxIDUuMzI4NDMgMjAuMzI4NCA2IDE5LjUgNkgxOC41IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8cGF0aCBkPSJNMTYgMjFINUMzLjg5NTQzIDIxIDMgMjAuMTA0NiAzIDE5VjE5QzMgMTcuODk1NCAzLjg5NTQzIDE3IDUgMTdIMTQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik05IDdIMTQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCjxwYXRoIGQ9Ik05IDExSDE0IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4=)](LICENSE)
[![GitHub Star](https://img.shields.io/github/stars/megatocha/steamDB-AppID-Copier?style=for-the-badge&labelColor=fae5c0&color=yellow&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPgo8c3ZnIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDM2IDM2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIiBjbGFzcz0iaWNvbmlmeSBpY29uaWZ5LS10d2Vtb2ppIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij48cGF0aCBmaWxsPSIjRkZBQzMzIiBkPSJNMjcuMjg3IDM0LjYyN2MtLjQwNCAwLS44MDYtLjEyNC0xLjE1Mi0uMzcxTDE4IDI4LjQyMmwtOC4xMzUgNS44MzRhMS45NyAxLjk3IDAgMCAxLTIuMzEyLS4wMDhhMS45NzEgMS45NzEgMCAwIDEtLjcyMS0yLjE5NGwzLjAzNC05Ljc5MmwtOC4wNjItNS42ODFhMS45OCAxLjk4IDAgMCAxLS43MDgtMi4yMDNhMS45NzggMS45NzggMCAwIDEgMS44NjYtMS4zNjNMMTIuOTQ3IDEzbDMuMTc5LTkuNTQ5YTEuOTc2IDEuOTc2IDAgMCAxIDMuNzQ5IDBMMjMgMTNsMTAuMDM2LjAxNWExLjk3NSAxLjk3NSAwIDAgMSAxLjE1OSAzLjU2NmwtOC4wNjIgNS42ODFsMy4wMzQgOS43OTJhMS45NyAxLjk3IDAgMCAxLS43MiAyLjE5NGExLjk1NyAxLjk1NyAwIDAgMS0xLjE2LjM3OXoiPjwvcGF0aD48L3N2Zz4=)](https://github.com/megatocha/steamDB-AppID-Copier/stargazers)
![GitHub Repo size](https://img.shields.io/github/repo-size/megatocha/steamDB-AppID-Copier?style=for-the-badge&color=3cb371&labelColor=fae5c0&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyBmaWxsPSIjMDAwMDAwIiB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICAgIDxwYXRoIGQ9Ik0xMS45NzUgMTAuODM4bC0wLjAyMS03LjIxOWMtMC4wMDktMC40MDQtMC4zNDQtMC42NDQtMC43NDgtMC42NTRsLTAuNTEzLTAuMDAxYy0wLjQwNS0wLjAwOS0wLjcyNSAwLjM0My0wLjcxNiAwLjc0N2wwLjAyOCA0Ljg1MS04LjMyMS04LjI0MmMtMC4zOTEtMC4zOTEtMS4wMjQtMC4zOTEtMS40MTQgMHMtMC4zOTEgMS4wMjQgMCAxLjQxNGw4LjI4NSA4LjIwNy00LjcyMSAwLjAxMmMtMC40MDQtMC4wMDktMC43NzkgMC4yNy0wLjg0IDAuNzQ2bDAuMDAxIDAuNTEzYzAuMDEwIDAuNDA1IDAuMzQ0IDAuNzM5IDAuNzQ4IDAuNzQ4bDcuMTcyLTAuMDMxYzAuMDA4IDAuMDAxIDAuMDEzIDAuMDAzIDAuMDIwIDAuMDAzbDAuMzY2IDAuMDA4YzAuMjAxIDAuMDA1IDAuMzgzLTAuMDc0IDAuNTEyLTAuMjA1IDAuMTMyLTAuMTMgMC4xNzgtMC4zMTEgMC4xNzUtMC41MTRsLTAuMDQwLTAuMzY2YzAuMDAxLTAuMDA3IDAuMDI3LTAuMDEyIDAuMDI3LTAuMDE5ek0yMC4xODcgMTEuNzM2YzAuMTI5IDAuMTMgMC4zMTEgMC4yMSAwLjUxMiAwLjIwNWwwLjM2Ni0wLjAwOGMwLjAwNyAwIDAuMDEyLTAuMDAyIDAuMDIwLTAuMDA0bDcuMTcyIDAuMDMxYzAuNDA0LTAuMDA5IDAuNzM4LTAuMzQ0IDAuNzQ3LTAuNzQ4bDAuMDAxLTAuNTEzYy0wLjA2MS0wLjQ3Ni0wLjQzNi0wLjc1NS0wLjg0LTAuNzQ2bC00LjcyMS0wLjAxMiA4LjI4NS04LjIwN2MwLjM5MS0wLjM5MSAwLjM5MS0xLjAyNCAwLTEuNDE0cy0xLjAyMy0wLjM5MS0xLjQxNCAwbC04LjMyIDguMjQxIDAuMDI3LTQuODUxYzAuMDA5LTAuNDA0LTAuMzExLTAuNzU2LTAuNzE1LTAuNzQ3bC0wLjUxMyAwLjAwMWMtMC40MDUgMC4wMTAtMC43MzkgMC4yNS0wLjc0OCAwLjY1NGwtMC4wMjEgNy4yMTljMCAwLjAwNyAwLjAyNyAwLjAxMiAwLjAyNyAwLjAyMGwtMC4wNDAgMC4zNjZjLTAuMDA1IDAuMjAzIDAuMDQzIDAuMzg0IDAuMTc0IDAuNTE0ek0xMS44MTMgMjAuMjMyYy0wLjEzLTAuMTMxLTAuMzExLTAuMjEtMC41MTItMC4yMDVsLTAuMzY2IDAuMDA5Yy0wLjAwNyAwLTAuMDEyIDAuMDAzLTAuMDIwIDAuMDAzbC03LjE3My0wLjAzMmMtMC40MDQgMC4wMDktMC43MzggMC4zNDMtMC43NDggMC43NDdsLTAuMDAxIDAuNTE0YzAuMDYyIDAuNDc2IDAuNDM2IDAuNzU1IDAuODQgMC43NDVsNC43MjcgMC4wMTItOC4yOSA4LjIzOGMtMC4zOTEgMC4zOS0wLjM5MSAxLjAyMyAwIDEuNDE0czEuMDI0IDAuMzkgMS40MTQgMGw4LjMyMS04LjI2OC0wLjAyOCA0Ljg3OGMtMC4wMDkgMC40MDQgMC4zMTIgMC43NTYgMC43MTYgMC43NDdsMC41MTMtMC4wMDFjMC40MDUtMC4wMTAgMC43MzktMC4yNSAwLjc0OC0wLjY1NGwwLjAyMS03LjIxOWMwLTAuMDA3LTAuMDI3LTAuMDExLTAuMDI3LTAuMDE5bDAuMDQwLTAuMzk3YzAuMDA1LTAuMjAzLTAuMDQzLTAuMzg0LTAuMTc0LTAuNTE0ek0yMy40MzkgMjIuMDI4bDQuNzI3LTAuMDEyYzAuNDA0IDAuMDA5IDAuNzc5LTAuMjcgMC44NC0wLjc0NWwtMC4wMDEtMC41MTRjLTAuMDEwLTAuNDA0LTAuMzQ0LTAuNzM5LTAuNzQ4LTAuNzQ4aC03LjE3MmMtMC4wMDgtMC0wLjAxMy0wLjAwMy0wLjAyMC0wLjAwM2wtMC40MjgtMC4wMDljLTAuMjAxLTAuMDA2LTAuMzg0IDAuMTM2LTAuNTEyIDAuMjY3LTAuMTMxIDAuMTMtMC4xNzggMC4zMTEtMC4xNzQgMC41MTRsMC4wNDAgMC4zNjZjMCAwLjAwOC0wLjAyNyAwLjAxMi0wLjAyNyAwLjAxOWwwLjAyMSA3LjIxOWMwLjAwOSAwLjQwNCAwLjM0MyAwLjY0NCAwLjc0OCAwLjY1NGwwLjU0NCAwLjAwMWMwLjQwNCAwLjAwOSAwLjcyNS0wLjM0MyAwLjcxNS0wLjc0N2wtMC4wMjctNC44MjkgOC4zNTIgOC4yMmMwLjM5IDAuMzkxIDEuMDIzIDAuMzkxIDEuNDE0IDBzMC4zOTEtMS4wMjMgMC0xLjQxNHoiPjwvcGF0aD4NCjwvc3ZnPg==)
[![Release Version](https://img.shields.io/github/v/release/megatocha/steamDB-AppID-Copier?style=for-the-badge&labelColor=fae5c0&logo=data:image/svg%2bxml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIGZpbGw9IiMwMDAwMDAiIHZlcnNpb249IjEuMSIgaWQ9IkNhcGFfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgDQoJIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDQ2IDQ2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBkPSJNMzYuNDU1LDE3LjA1NmgtMC4xNzRjLTEuNTc3LTYtNi44ODUtMTAuMTEzLTEzLjIwNy0xMC4xMTNzLTExLjYzLDQuMTEzLTEzLjIwNywxMC4xMTNIOS42OTMNCgkJCUM0LjM4MSwxNy4wNTYsMCwyMS42NzYsMCwyNi45ODl2Mi43NjJjMCw1LjMxMiw0LjM4MSw5LjMwNiw5LjY5Myw5LjMwNmgyNi43NjJjNS4zMTIsMCw5LjU0NS0zLjk5NCw5LjU0NS05LjMwN3YtMi43NjINCgkJCUM0NiwyMS42NzYsNDEuNzY4LDE3LjA1NiwzNi40NTUsMTcuMDU2eiBNMzEuNzM4LDIyLjU4M2wtOS42MjcsOS42MjhjLTAuODUxLDAuODUyLTIuMjI5LDAuODUyLTMuMDgsMGwtNC43NzItNC43NzENCgkJCWMtMC44NTEtMC44NTItMC44NTEtMi4yMjksMC4wMDEtMy4wOGMwLjg1LTAuODUyLDIuMjI5LTAuODUyLDMuMDc4LDBsMi44NDUsMi44NDRjMC4xMDMsMC4xMDQsMC4yNDMsMC4xNjEsMC4zODksMC4xNjENCgkJCXMwLjI4Ni0wLjA2LDAuMzg5LTAuMTYxbDcuNjk5LTcuN2MwLjQwOC0wLjQwOCwwLjk2Mi0wLjYzOCwxLjU0LTAuNjM4YzAuNTc3LDAsMS4xMzIsMC4yMjksMS41NCwwLjYzOQ0KCQkJQzMyLjU5LDIwLjM1NCwzMi41OSwyMS43MzMsMzEuNzM4LDIyLjU4M3oiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4=)](https://github.com/megatocha/steamDB-AppID-Copier/releases/latest)

</div>

## ✨ Возможности
- 🎮 **Страницы отдельных игр**: Кнопка копирования рядом с полем App ID
- 📊 **Страницы рейтингов и распродаж**: Кнопки копирования для каждой игры в рейтингах
- 📜 **Всплывающее окно и история**: Легкое перекопирование
- 🎨 **Современный дизайн**: Красивые градиентные кнопки с плавными анимациями
- ⚡ **Скорость**: Легкое и эффективное расширение

### 🚀 Быстрая установка
[![Firefox Download](https://img.shields.io/badge/Firefox-Download-%23FF7139?logo=firefoxbrowser&labelColor=%23222222&color=%234caf50&style=for-the-badge)][firefox]
[![Firefox Users](https://img.shields.io/amo/dw/steamdb-app-id-copier?labelColor=23222222&label=&style=for-the-badge)][firefox]

### ⬇️ Ручная установка (для разработчиков)
1. Скачайте или клонируйте этот репозиторий
2. Откройте Firefox и перейдите на `about:debugging`
3. Нажмите "Этот Firefox" в боковой панели
4. Нажмите "Загрузить временное дополнение"
5. Выберите файл `manifest.json` из скачанной папки

## ⚙️ Использование
1. Перейдите на любую страницу игры SteamDB или страницу рейтингов
2. Найдите фиолетовые кнопки "Копировать" рядом с App ID
3. Нажмите для копирования App ID в буфер обмена
4. Уведомление подтвердит действие копирования

## 📎 Поддерживаемые страницы
- `steamdb.info/app/*` - Страницы отдельных
- `steamdb.info/charts/` - Рейтинги и чарты
- `steamdb.info/sales` - Скидки и распродажи

## 🧩 Скриншоты
<details>
<summary><strong>📷 Нажмите чтобы открыть (4)</strong></summary>
<div align="center">

### Страница игры
<img width="1920" height="947" alt="firefox_u2z32Syj06" src="https://github.com/user-attachments/assets/f2529532-2e7e-4259-b3cc-6104f3f4a93d" />

---

### Страница рейтингов
<img width="1920" height="947" alt="firefox_bF9dwGFkqR" src="https://github.com/user-attachments/assets/50b0c04a-21a7-4432-a398-dd134f40e5b2" />

---

### Страница скидок
<img width="1920" height="947" alt="firefox_AOP8GUVf50" src="https://github.com/user-attachments/assets/5a456a7d-9100-4297-98c3-e2aae7e252ca" />

---

### Всплывающее окно
<img width="370" height="566" alt="QKdrrXvOFx" src="https://github.com/user-attachments/assets/63aa80dd-0f16-405b-b365-5182d97cde1e" />

---

</div>
</details>

## ©️ Лицензия
MIT License - смотрите файл [LICENSE](./LICENSE) для подробностей<br>
<div align="center">

## 👤 Автор
Создано с ❤️ для игрового сообщества Steam

<b>⭐ Поставь звезду моему проекту!</b> <br>
![star](https://github.com/user-attachments/assets/cc66e612-3b0f-4232-9467-e246d2d30f90)<br>

</div>

[firefox]: https://addons.mozilla.org/ru/firefox/addon/steamdb-app-id-copier/
