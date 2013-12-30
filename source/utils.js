//various utility functions..

function show_model(loader, model_file, x, z)
{

		var test = create_game_object();
		test.name = "test model";
		test.model = model_file;

		test.position.y = 0;
		test.position.x = x*SQUARE_SIZE;
		test.position.z = z*SQUARE_SIZE;

		loader.load( test.model, test.loadObject(test) );
}