import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByteArkPlayerContainer } from './byteark-player-container.component';

describe('ByteArkPlayerContainer', () => {
  let component: ByteArkPlayerContainer;
  let fixture: ComponentFixture<ByteArkPlayerContainer>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ByteArkPlayerContainer],
    });
    fixture = TestBed.createComponent(ByteArkPlayerContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize player when lazyload is false', () => {
    component.options = {
      lazyload: false,
      sources: [
        {
          videoId: '1',
          src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
          type: 'application/x-mpegURL',
          title: 'Big Buck Bunny',
          poster:
            'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
          description:
            "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
        },
      ],
    };
    component.ngOnInit();
    expect(component.player).toBeDefined();
  });

  it('should not initialize player when lazyload is true', () => {
    component.options = {
      lazyload: true,
      sources: [
        {
          videoId: '1',
          src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
          type: 'application/x-mpegURL',
          title: 'Big Buck Bunny',
          poster:
            'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
          description:
            "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
        },
      ],
    };
    component.ngOnInit();
    expect(component.player).toBeNull();
  });

  it('should dispose player on destroy', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.player).toBeNull();
  });

  it('should handle player load error', () => {
    component.options = {
      sources: [
        {
          videoId: '1',
          src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m8',
          type: 'application/x-mpegURL',
          title: 'Big Buck Bunny',
        },
      ],
    };
    component.ngOnInit();
    component.onPlayerLoadError(
      {
        message: 'Failed to load video',
        messageSecondary: 'Original error',
        code: 'ERROR_BYTEARK_PLAYER_REACT_100000',
        originalError: new Error('Original error'),
        name: 'Error',
      },
      new Error('Original error')
    );
    expect(component.playerContainerState.error).toBeTruthy();
  });

  describe('updateVideoClasses', () => {
    it('should add custom class when class is provided', () => {
      component.options = {
        class: 'custom-class',
        sources: [
          {
            videoId: '1',
            src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
            type: 'application/x-mpegURL',
            title: 'Big Buck Bunny',
            poster:
              'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
          },
        ],
      };
      component.ngOnInit();
      component.updateVideoClasses();
      expect(component.videoClasses).toContain('custom-class');
    });

    it('should add vjs-16-9 class for 16:9 aspect ratio', () => {
      component.options = {
        fluid: true,
        aspectRatio: '16:9',
        sources: [
          {
            videoId: '1',
            src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
            type: 'application/x-mpegURL',
            title: 'Big Buck Bunny',
            poster:
              'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
            description:
              "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
          },
        ],
      };
      component.ngOnInit();
      component.updateVideoClasses();
      expect(component.videoClasses).toContain('vjs-16-9');
    });

    it('should add vjs-4-3 class for 4:3 aspect ratio', () => {
      component.options = {
        fluid: true,
        aspectRatio: '4:3',
        sources: [
          {
            videoId: '1',
            src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
            type: 'application/x-mpegURL',
            title: 'Big Buck Bunny',
            poster:
              'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
            description:
              "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
          },
        ],
      };
      component.ngOnInit();
      component.updateVideoClasses();
      expect(component.videoClasses).toContain('vjs-4-3');
    });

    it('should not add aspect ratio class when fluid is false', () => {
      component.options = {
        fluid: false,
        aspectRatio: '16:9',
        sources: [
          {
            videoId: '1',
            src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
            type: 'application/x-mpegURL',
            title: 'Big Buck Bunny',
            poster:
              'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
            description:
              "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
          },
        ],
      };
      component.ngOnInit();
      component.updateVideoClasses();
      expect(component.videoClasses).not.toContain('vjs-16-9');
    });

    it('should not add any classes when no relevant options are provided', () => {
      component.options = {
        sources: [
          {
            videoId: '1',
            src: 'https://byteark-playertzxedwv.stream-playlist.byteark.com/streams/ToIkm61TMn4Q/playlist.m3u8',
            type: 'application/x-mpegURL',
            title: 'Big Buck Bunny',
            poster:
              'https://stream-image.byteark.com/image/video-cover-480p/7/K/7KPloVWgN.png',
            description:
              "Big Buck Bunny (code-named Project Peach) is a 2008 short computer-animated comedy film featuring animals of the forest, made by the Blender Institute, part of the Blender Foundation. Like the foundation's previous film, Elephants Dream, the film was made using Blender, a free and open-source software application for 3D computer modeling and animation developed by the same foundation. Unlike that earlier project, the tone and visuals departed from a cryptic story and dark visuals to one of comedy, cartoons, and light-heartedness.",
          },
        ],
      };
      component.ngOnInit();
      component.updateVideoClasses();
      expect(component.videoClasses).not.toContain('vjs-16-9');
      expect(component.videoClasses).not.toContain('vjs-4-3');
      expect(component.videoClasses).not.toContain('custom-class');
    });
  });
});
