//Started script log at 06/15/22 12:26:20

getBody(1).select();
getBody(1).deselect();
getFixture(2).delete();
getFixture(1).delete();
getBody(1).delete();
getBody(2).select();
getBody(2).setPosition(-45.458,0.378956);
getBody(2).deselect();
getBody(3).select();
getBody(3).setPosition(45.1572,0.399884);
getBody(3).deselect();
getBody(2).select();
getBody(2).setPosition(-47.181,0.457274);
getBody(2).deselect();
getBody(3).select();
getBody(3).setPosition(47.1151,0.556519);
getBody(3).deselect();
getBody(4).select();
getBody(4).setPosition(-10.5038,21.4769);
addBody(5, '{"angle":0,"angularVelocity":0,"awake":true,"linearVelocity":0,"name":"body1","position":{"x":-10.50380992889404,"y":21.47688293457031},"type":"static"}');
getBody(5).addFixture(6, '{"density":1,"friction":0.2,"name":"fixture1","shapes":[{"type":"polygon"}],"vertices":{"x":[0.5,0.5,-0.5,-0.5],"y":[-0.5,0.5,0.5,-0.5]}}');
getBody(4).deselect();
getBody(5).select();
getBody(5).setPosition(-10.5821,-25.0438);
getBody(5).deselect();
getBody(2).select();
getBody(2).setPosition(-48.1991,0.535592);
getBody(2).deselect();
getBody(3).select();
getBody(3).setPosition(48.2116,0.556519);
getBody(3).deselect();
getBody(2).select();
getVertex(3,2).select();
getVertex(3,2).setPos(-0.385815, 13.0035);
getVertex(3,2).deselect();
getVertex(3,1).select();
getVertex(3,1).setPos(0.67128, 13.4602);
getVertex(3,1).deselect();
getVertex(3,0).select();
getVertex(3,0).setPos(0.557091, -16.6575);
getVertex(3,0).deselect();
getVertex(3,3).select();
getVertex(3,3).setPos(-0.442909, -13.8028);
getVertex(3,3).setPos(-0.442909, -21.1108);
getVertex(3,3).deselect();
getVertex(3,0).select();
getVertex(3,0).setPos(0.499996, -18.827);
getFixture(3).addVertex(1, 0.789509, -12.2282);
getFixture(3).addVertex(2, 2.73069, -7.03267);
getFixture(3).addVertex(3, 0.846603, -1.72297);
getFixture(3).addVertex(4, 1.81719, 7.01234);
getFixture(3).addVertex(5, 2.33104, 10.7805);
getFixture(3).addVertex(6, 3.53, 11.3514);
getVertex(3,0).deselect();
getVertex(4,2).select();
getVertex(4,2).setPos(-0.751991, 17.5515);
getVertex(4,2).deselect();
getVertex(4,1).select();
getVertex(4,1).setPos(1.08799, 17.5515);
getVertex(4,1).deselect();
getVertex(4,0).select();
getVertex(4,0).setPos(0.835991, -24.9433);
getVertex(4,0).deselect();
getVertex(4,3).select();
getVertex(4,3).setPos(-0.667995, -27.4632);
getVertex(4,3).deselect();
getFixture(4).addVertex(3, -4.18264, -26.512);
getVertex(4,4).select();
getVertex(4,4).deselect();
getFixture(4).addVertex(3, -1.9987, -24.58);
getVertex(4,5).select();
getVertex(4,5).deselect();
getFixture(4).addVertex(3, -3.51066, -18.0282);
getVertex(4,6).select();
getVertex(4,6).deselect();
getFixture(4).addVertex(3, -3.84665, -6.26855);
getVertex(4,7).select();
getVertex(4,7).deselect();
getFixture(4).addVertex(3, -1.07473, -0.388712);
getVertex(4,8).select();
getVertex(4,8).deselect();
getFixture(4).addVertex(3, -1.15873, 9.35501);
getVertex(4,9).select();
getVertex(4,9).deselect();
