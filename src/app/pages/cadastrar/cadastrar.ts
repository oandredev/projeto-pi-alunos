import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Aluno } from '../../core/types/types';
import { AlunosService } from '../../core/services/alunos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cadastrar.html',
  styleUrl: './cadastrar.css',
})
export class Cadastrar {
  titulo = 'Cadastro de Alunos';

  aluno: Aluno = {
    id: '',
    ra: '',
    nome: '',
    cep: '',
    nota01: 0,
    nota02: 0,
  } as Aluno;

  constructor(
    private alunosService: AlunosService,
    private router: Router,
  ) {}

  submeter() {
    // 1. Fiz para criar a validação
    const apenasNumeros = /^[0-9]+$/; // Só aceita de 0 a 9
    const nomeValido = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/; // Aceita apenas letras e espaços, do começo ao fim do texto

    // 2. Validação: Nome não pode ser só espaço e deve conter letras
    // O .trim() remove espaços nas pontas e o test verifica se tem letras
    if (!this.aluno.nome.trim() || !nomeValido.test(this.aluno.nome)) {
      alert('Atenção! O nome do aluno é inválido ou está em branco.');
      return;
    }

    // 3. Validação: RA deve conter APENAS números
    if (!apenasNumeros.test(this.aluno.ra)) {
      alert('Atenção! O RA deve conter apenas números.');
      return;
    }
    // 4. Validação do CEP (Exatamente 8 dígitos)
    if (this.aluno.cep.length !== 8 || !apenasNumeros.test(this.aluno.cep)) {
      alert('O CEP deve conter exatamente 8 números.');
      return;
    }

    // 5. O "Filtro": Só deixa passar se as notas forem válidas - aqui coloquei a regra de negócio
    if (
      this.aluno.nota01 < 0 ||
      this.aluno.nota01 > 10 ||
      this.aluno.nota02 < 0 ||
      this.aluno.nota02 > 10
    ) {
      alert('Atenção! As notas devem ser entre 0 e 10.');
      return; // para a execução aqui mesmo
    }

    this.aluno.id = this.aluno.id.toString(); // Convertendo o ID para string, já que o backend espera uma string
    this.aluno.ra = this.aluno.ra.toString(); // Convertendo o RA para string, já que o backend espera uma string

    // 5.2 (continuei). O "Envio": Só acontece se o código não parou no 'return' acima
    this.alunosService.incluir(this.aluno).subscribe({
      next: () => {
        alert('Aluno cadastrado com sucesso!');
        this.router.navigate(['/listagem']); // quando der certo, eu jpa lanço para a página de listagem
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao salvar o aluno.'); // se eu desconectar o banco, dá esse erro
      },
    });
  }
}
