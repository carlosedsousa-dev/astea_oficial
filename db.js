/**
 * db.js - Camada de Persistência com IndexedDB
 * Gerencia a conexão e operações de I/O no banco de dados local.
 */

const DB_NAME = 'AsteaDB';
const DB_VERSION = 1;

export const db = {
    _instance: null,

    /**
     * Inicializa e abre a conexão com o banco de dados
     */
    async open() {
        if (this._instance) return this._instance;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Store para Feiras
                if (!db.objectStoreNames.contains('feiras')) {
                    db.createObjectStore('feiras', { keyPath: 'id', autoIncrement: true });
                }

                // Store para Projetos
                if (!db.objectStoreNames.contains('projetos')) {
                    const projectStore = db.createObjectStore('projetos', { keyPath: 'id', autoIncrement: true });
                    projectStore.createIndex('feiraId', 'feiraId', { unique: false });
                }

                // Store para Avaliações
                if (!db.objectStoreNames.contains('avaliacoes')) {
                    const evalStore = db.createObjectStore('avaliacoes', { keyPath: 'id', autoIncrement: true });
                    evalStore.createIndex('projetoId', 'projetoId', { unique: false });
                }
            };

            request.onsuccess = (event) => {
                this._instance = event.target.result;
                resolve(this._instance);
            };

            request.onerror = (event) => reject(`Erro ao abrir IndexedDB: ${event.target.error}`);
        });
    },

    /**
     * Operação Genérica de Adição
     */
    async add(storeName, data) {
        const database = await this.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao adicionar em ${storeName}`);
        });
    },

    /**
     * Operação Genérica de Busca (Todos)
     */
    async getAll(storeName) {
        const database = await this.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao buscar de ${storeName}`);
        });
    },

    /**
     * Atualiza um registro existente
     */
    async update(storeName, data) {
        const database = await this.open();
        return new Promise((resolve, reject) => {
            const transaction = database.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(`Erro ao atualizar ${storeName}`);
        });
    }
};
