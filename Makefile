SERVICES = api-gateway user-service catalog-service order-service \
           payment-service inventory-service notification-service shipping-service

TAG ?= latest

# Build all service images
build-all:
	@for svc in $(SERVICES); do \
		echo "🔨 Building $$svc..."; \
		docker build --build-arg SERVICE=$$svc -t $$svc:$(TAG) .; \
	done

# Build a single service: make build SERVICE=user-service
build:
	docker build --build-arg SERVICE=$(SERVICE) -t $(SERVICE):$(TAG) .

# Local dev
up:
	docker compose up --build

down:
	docker compose down -v

# Tail logs for one service: make logs SERVICE=user-service
logs:
	docker compose logs -f $(SERVICE)

# Shell into a running container: make shell SERVICE=user-service
shell:
	docker compose exec $(SERVICE) sh