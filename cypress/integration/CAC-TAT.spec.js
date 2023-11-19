///reference types = "Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
  beforeEach(function(){
    cy.visit('./src/index.html')
  })  

  it('verifica o título da aplicação', function(){
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste, teste teste teste teste teste teste teste teste teste teste teste teste, teste teste teste teste teste teste teste teste teste teste teste teste, teste teste teste teste teste teste teste teste teste teste teste teste, teste teste teste teste teste teste teste teste teste teste teste'
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Brosco')
        cy.get('#email').type('allanbrosco@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Brosco')
        cy.get('#email').type('allanbrosco@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value','')
        cy.get('#phone').type('21153500')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulario', function(){
        cy.get('#firstName').type('Allan')
        cy.get('#lastName').type('Brosco')
        cy.get('#email').type('allanbrosco@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Allan')
          .should('have.value','Allan')
          .clear()
          .should('have.value','')
          cy.get('#lastName')
          .type('Brosco')
          .should('have.value','Brosco')
          .clear()
          .should('have.value','')
          cy.get('#email')
          .type('allanbrosco@gmail.com')
          .should('have.value','allanbrosco@gmail.com')
          .clear()
          .should('have.value','')
          cy.get('#phone')
            .type('21153500')
            .should('have.value','21153500')
            .clear()
            .should('have.value','')
    })

    it ('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatorios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Envio o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldAndSubmit()
        cy.get('.success').should('be.visible')
    })
     it('Selecione um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select('YouTube')
          .should('have.value','youtube')
     })

     it ('Selecione um produto (Mentoria) por seu valor', function(){
        cy.get('#product')
          .select('mentoria')
          .should('have.value','mentoria')
     })

     it('Selecione um produto (blog) pelo seu indice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value','blog')
      })
    it ('Selecionando todos os componente com texto',function(){
        cy.get('#product').select('Blog').should('have.value','blog').type('blog',{delay:0})
        cy.get('#product').select('Cursos').should('have.value','cursos').type('blog',{delay:0})
        cy.get('#product').select('Mentoria').should('have.value','mentoria').type('blog',{delay:0})
        cy.get('#product').select('YouTube').should('have.value','youtube').type('blog',{delay:0})
    })

    it('Marcar o tipo de atendimento Feedback usando .check', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it('Selecionar cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length',3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marcar ambos checkboxes, depois desmarcar o ultimo', function(){
        cy.get('input[type="checkbox"]')
         .check()
         .should('be.checked')
         .last()
         .uncheck()
         .should('not.be.checked')

    })

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value') 
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Selececione um arquivo simulando drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value') 
        .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', function(){
        cy.fixture('example.json').as('samplefile')
        cy.get('input[type="file"]')
          .selectFile('@samplefile')
          .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
          })
    })
    
    it('Verifica que a politica privacidade abre em outra aba sem a necessidade de um click', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
    })

    /*it('Acessa página da Politica de Privacidade removendo o target e entao clicando no link',function(){
        cy.get('#privacy a')
          .invoke('removeAttr','target')
          .click()
          cy.contains('Talking About Testing').should('be.visible')
    })*/
   


})
