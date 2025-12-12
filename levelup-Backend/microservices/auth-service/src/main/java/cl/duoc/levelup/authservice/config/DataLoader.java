package cl.duoc.levelup.authservice.config;

import cl.duoc.levelup.authservice.model.Usuario;
import cl.duoc.levelup.authservice.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {

        if (usuarioRepository.count() == 0) {
            Usuario admin = new Usuario();
            admin.setNombre("Admin General");
            admin.setEmail("admin@levelup.cl");
            admin.setPassword("admin123");
            admin.setEdad(30);
            admin.setRol("ADMIN");

            usuarioRepository.save(admin);

            System.out.println("Usuario administrador creado automáticamente");
        } else {
            System.out.println("Admin ya existe, no se vuelve a crear.");
        }
    }
}
