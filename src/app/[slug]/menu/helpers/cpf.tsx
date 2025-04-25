export const removeCpfPunctuation = (cpf: string) => {
     return cpf.replace(/[\.\-]/g, "");
  };

export const isValidCpf = (cpf: string): boolean => {
    // Remove qualquer caractere não numérico (formatação)
    cpf = cpf.replace(/\D/g, '');
  
    // Exibe o CPF "limpo" para depuração
    console.log("CPF após remoção de formatação:", cpf);
    
    // Verifica se o CPF tem exatamente 11 dígitos
    if (cpf.length !== 11) {
      console.log("CPF inválido: tamanho incorreto.");
      return false;
    }
  
    // Verifica se todos os dígitos são iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
      console.log("CPF inválido: dígitos repetidos.");
      return false;
    }
  
    // Verifica o primeiro dígito verificador
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (10 - i);  // Multiplicação pela posição do dígito
    }
  
    let firstVerifier = (sum * 10) % 11;
    firstVerifier = firstVerifier === 10 || firstVerifier === 11 ? 0 : firstVerifier;
  
    console.log("Primeiro dígito verificador calculado:", firstVerifier);
    if (firstVerifier !== parseInt(cpf.charAt(9), 10)) {
      console.log("CPF inválido: primeiro dígito verificador incorreto.");
      return false;
    }
  
    // Verifica o segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
  
    let secondVerifier = (sum * 10) % 11;
    secondVerifier = secondVerifier === 10 || secondVerifier === 11 ? 0 : secondVerifier;
  
    console.log("Segundo dígito verificador calculado:", secondVerifier);
    if (secondVerifier !== parseInt(cpf.charAt(10), 10)) {
      console.log("CPF inválido: segundo dígito verificador incorreto.");
      return false;
    }
  
    // Se passou todas as validações, é um CPF válido
    return true;
  }
  