#!/bin/sh
set -e

TEMPLATE=/usr/share/nginx/html/env.template.js
TARGET=/usr/share/nginx/html/env.js

# 404 방지: 먼저 템플릿 그대로 복사
cp "$TEMPLATE" "$TARGET"

# 실제 값 치환
envsubst '${REACT_APP_API_BASE}' < "$TEMPLATE" > "$TARGET"

exec "$@"