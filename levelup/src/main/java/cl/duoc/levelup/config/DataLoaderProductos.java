package cl.duoc.levelup.config;

import cl.duoc.levelup.model.Producto;
import cl.duoc.levelup.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoaderProductos {

    @Bean
    public CommandLineRunner initData(ProductoRepository productoRepository) {
        return args -> {

            insertarSiNoExiste(productoRepository, new Producto(
                    "JM001", "Catan", "JuegosDeMesa", 29990,
                    "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para reuniones familiares.",
                    "/img/catan.png", 20
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "JM002", "Carcassonne", "JuegosDeMesa", 24990,
                    "Juego de colocación de fichas donde los jugadores construyen el paisaje medieval.",
                    "/img/Carcassonne.png", 10
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "AC001", "Controlador Inalámbrico Xbox Series X", "Accesorios", 59990,
                    "Experiencia cómoda de juego con botones mapeables.",
                    "/img/control xbox.png", 4
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "AC002", "Auriculares Gamer HyperX Cloud II", "Accesorios", 79990,
                    "Sonido envolvente con micrófono desmontable.",
                    "/img/HyperX.png", 3
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "CO001", "PlayStation 5", "Consolas", 549990,
                    "Consola de última generación con gráficos impresionantes.",
                    "/img/PS5.png", 10
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "CG001", "PC Gamer ASUS ROG Strix", "ComputadoresGamers", 1299990,
                    "Equipo potente para gamers exigentes.",
                    "/img/Pcgamer.png", 2
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "SG002", "Silla Gamer Secretlab Titan", "SillasGamers", 349990,
                    "Máximo confort con diseño ergonómico.",
                    "/img/Sillagamer.png", 12
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "MS001", "Mouse Gamer Logitech G502 HERO", "Mouse", 49990,
                    "Mouse de gran precisión con botones personalizables.",
                    "/img/Mousegamer.png", 5
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "MP001", "Mousepad Razer Goliathus Extended Chroma", "Mousepad", 29990,
                    "Superficie suave con iluminación RGB.",
                    "/img/mousepad.jpg", 5
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "PP001", "Polera Gamer Personalizada 'Level-Up'", "Poleras", 14990,
                    "Polera estilizada personalizable.",
                    "/img/polera.png", 10
            ));

            insertarSiNoExiste(productoRepository, new Producto(
                    "PL001", "Polerón Gamer Personalizado 'Level-Up'", "Polerones", 21990,
                    "Polerón cómodo y personalizable.",
                    "/img/poleron.png", 10
            ));

            System.out.println("➡ Productos iniciales cargados correctamente.");
        };
    }

    private void insertarSiNoExiste(ProductoRepository repo, Producto producto) {
        if (!repo.existsById(producto.getCodigo())) {
            repo.save(producto);
            System.out.println("Producto creado: " + producto.getNombre());
        } else {
            System.out.println("Producto ya existe, no se crea: " + producto.getCodigo());
        }
    }
}
