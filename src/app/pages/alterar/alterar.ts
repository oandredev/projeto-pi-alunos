import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Aluno } from '../../core/types/types';
import { AlunosService } from '../../core/services/alunos';

@Component({
  selector: 'app-alterar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './alterar.html',
  styleUrl: './alterar.css'
})
export class Alterar implements OnInit {
  titulo = 'Alterar Aluno';

  aluno: Aluno = {
    id: '',
    ra: '',
    nome: '',
    cep: '',
    nota01: 0,
    nota02: 0
  };

  constructor(
    private alunosService: AlunosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alunosService.buscarPorId(id).subscribe({
        next: (dados) => {
          this.aluno = dados;
        },
        error: (err) => {
          console.error('Erro ao carregar:', err);
          alert('Não consegui encontrar esse aluno.');
        }
      });
    }
  }
  validarSomenteLetras() {
    if (this.aluno.nome) {
      this.aluno.nome = this.aluno.nome.replace(/[0-9]/g, '');
    }
  }

  validarSomenteNumeros(campo: 'ra' | 'cep') {
    if (campo === 'ra') {
      this.aluno.ra = this.aluno.ra.replace(/\D/g, '');
    } else if (campo === 'cep') {
      this.aluno.cep = this.aluno.cep.replace(/\D/g, '');
    }
  }

  salvar() {
    // --- LÓGICA IGUAL AO CADASTRAR ---
    const apenasNumeros = /^[0-9]+$/; // Só aceita de 0 a 9
    const nomeValido = /^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ ]+$/;// Aceita apenas letras e espaços, do começo ao fim do texto

    // 2. Validação: Nome não pode ser só espaço e deve conter letras
    // O .trim() remove espaços nas pontas e o test verifica se tem letras
    if (!this.aluno.nome.trim() || !nomeValido.test(this.aluno.nome)) {
      alert('Atenção! O nome do aluno é inválido ou está em branco.');
      return;
    }

    // 2. Validação do RA
    if (!apenasNumeros.test(this.aluno.ra)) {
      alert('Atenção! O RA deve conter apenas números.');
      return;
    }

    // 3. Validação do CEP
    if (this.aluno.cep.length !== 8 || !apenasNumeros.test(this.aluno.cep)) {
      alert('O CEP deve conter exatamente 8 números.');
      return;
    }

    // 4. Validação das Notas (Regra de Negócio)
    if (this.aluno.nota01 < 0 || this.aluno.nota01 > 10 ||
      this.aluno.nota02 < 0 || this.aluno.nota02 > 10) {
      alert('Atenção! As notas devem ser entre 0 e 10.');
      return;
    }

    // 5. Envio da Alteração
    this.alunosService.alterar(this.aluno).subscribe({
      next: () => {
        alert('Aluno atualizado com sucesso!');
        this.router.navigate(['/listagem']);
      },
      error: (err) => {
        console.error('Erro ao salvar:', err);
        alert('Erro ao atualizar o aluno.');
      }
    });
  }
}