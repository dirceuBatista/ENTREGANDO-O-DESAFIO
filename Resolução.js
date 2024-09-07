class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: { macaco: 3 } },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: {} },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { gazela: 1 } },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: {} },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: { leao: 1 } },
      ];
  
      this.animaisInfo = {
        LEAO: { tamanho: 3, bioma: 'savana' },
        LEOPARDO: { tamanho: 2, bioma: 'savana' },
        CROCODILO: { tamanho: 3, bioma: 'rio' },
        MACACO: { tamanho: 1, bioma: ['savana', 'floresta'] },
        GAZELA: { tamanho: 2, bioma: 'savana' },
        HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'] },
      };
    }
  
    analisaRecintos(especie, quantidade) {
      if (!this.animaisInfo[especie]) {
        return { erro: "Animal inválido" };
      }
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      const animalInfo = this.animaisInfo[especie];
      const recintosViaveis = this.recintos.filter(recinto => {
        if (!animalInfo.bioma.includes(recinto.bioma)) {
          return false;
        }
  
        const tamanhoOcupado = Object.keys(recinto.animais).reduce((acc, tipo) => acc + (this.animaisInfo[tipo].tamanho * recinto.animais[tipo]), 0);
        const espacoDisponivel = recinto.tamanho - tamanhoOcupado;
  
        if (espacoDisponivel < quantidade * animalInfo.tamanho) {
          return false;
        }
  
        if (espacoDisponivel >= quantidade * animalInfo.tamanho) {
          
          if (especie === 'MACACO' && quantidade === 1 && Object.keys(recinto.animais).length === 0) {
            return false;
          }
  
          if (especie === 'HIPOPOTAMO' && !['savana e rio'].includes(recinto.bioma)) {
            return false;
          }
  
          if (Object.keys(recinto.animais).length > 0 && Object.keys(recinto.animais).some(tipo => this.animaisInfo[tipo].bioma !== animalInfo.bioma && tipo !== especie)) {
            return false;
          }
  
          if (recinto.animais[especie] === undefined) {
            if (Object.keys(recinto.animais).length > 0) {
              return false;
            }
          }
  
          const espacoRestante = espacoDisponivel - (quantidade * animalInfo.tamanho) - (Object.keys(recinto.animais).length > 0 ? 1 : 0);
          return { numero: recinto.numero, espacoRestante, tamanho: recinto.tamanho };
        }
        return false;
      });
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return {
        recintosViaveis: recintosViaveis
          .map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoRestante} total: ${r.tamanho})`)
        .sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]))
      };
    }
  }