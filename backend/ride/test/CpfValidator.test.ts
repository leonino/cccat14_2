import Cpf from '../src/domain/valueObjects/Cpf';

test.each([
	new Cpf("97456321558"),
	new Cpf("71428793860"),
	new Cpf("87748248800")
])("Deve testar cpfs válidos", function (cpf: Cpf) {
	expect(cpf.validate()).toBe(true);
});

test.each([
	"",
	undefined,
	null,
	"11111111111",
	"111",
	"11111111111111"
])("Deve testar cpfs inválidos", function (cpf: any) {
	expect(new Cpf(cpf).validate()).toBe(false);
});
